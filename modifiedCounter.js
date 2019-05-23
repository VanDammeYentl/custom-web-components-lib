const template = document.createElement("template");
template.innerHTML = `
    <style>
    .counter-container {
        width: 200px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
    .counter-button {
        background-color: rgb(240, 240, 240);
        border: none;
        border: 1px solid black;
    }
    
    .counter-button:hover, .counter-submit:hover {
        cursor: pointer;
    }
    
    .counter-input {
        border: 1px solid black;
        text-align: right;
    }
    
    @media only screen and (max-width: 600px) {
        .counter-container {
            flex-direction: column;
        }
    
        .counter-button {
            padding: 10px 0;
        }
    
        .counter-input {
            padding: 5px 0;
        }
    
        .counter-input {
            font-size: 1.2rem;
            text-align: center;
        }
    }
    </style>
    <div class="counter-container">
        <button class="counter-button">-</button>
        <input class="counter-input"/>
        <button class="counter-button">+</button>
    </div>
`;

class CustomCounter extends HTMLElement {

    // Getters and setters
    set value(value) {
        if(value >= this._MIN_VALUE) {
            this._value = value;
            this.valueElement.value = this._value;
        }
    }

    get value() {
        return this._value;
    }


    set max(value) {
        this._MAX_VALUE = value;
    }

    get max() {
        return this._MAX_VALUE;
    }


    set min(value) {
        this._MIN_VALUE = value + 1;
    }

    get min() {
        return this._MIN_VALUE;
    }

    // Allows the user to enter attributes
    static get observedAttributes() {
        return ["start", "max", "min"];
    }

    // Constructor
    constructor() {
        // Inheritance
        super();

        // Values
        this._value = 0;
        this._valueString = "";
        this._MIN_VALUE = -1;
        this._MAX_VALUE = 25;

        // Attaching Shadow DOM and template
        this.root = this.attachShadow({ mode: "open" });
        this.root.appendChild(template.content.cloneNode(true));

        // Selecting tags
        this.valueElement = this.root.querySelector("input");
        this.decrementButton = this.root.querySelectorAll("button")[0];
        this.incrementButton = this.root.querySelectorAll("button")[1];

        // Event listeners
        this.decrementButton.addEventListener("click", (e) => this.value--);
        this.incrementButton.addEventListener("click", (e) => this.value++);
        this.valueElement.addEventListener("input", (e) => {
            this.updateValue(this.valueElement.value);
        });
    }

    // Gets called when the user enters custom attributes
    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "start") {
            this._value = newValue;
        }

        if(name === "max") {
            this._MAX_VALUE = newValue;
        }

        if(name === "min") {
            this._MIN_VALUE = newValue;
        }

        // Show the start value in the input
        this.valueElement.value = this._valueString;

        // Check if the passed attributes by the user make sense
        this.checkForValidAttributes();
    }

    // Preparing the input for the user
    updateValue(element) {
        this._valueString = element.toString();
        let inputValue = parseInt(this._valueString);

        if(!isNaN(inputValue)) {
            if(inputValue < 0) {
                this.value = 0;
            }
            else if(inputValue > this._MAX_VALUE) {
                this.value = this._MAX_VALUE;
            }
            else {
                this.value = inputValue;
            }
        }
        else {
            this.value = 0;
        }
    }

    // Check if the attributes make sense
    checkForValidAttributes() {
        if(parseInt(this._value) < parseInt(this._MIN_VALUE)) {
            console.error(`start value (${this._value}) is smaller than the minimum value (${this._MIN_VALUE})`);
        }

        else if(parseInt(this._value) > parseInt(this._MAX_VALUE)) {
            console.error(`start value (${this._value}) is larger than the maximum value (${this._MAX_VALUE})`);
        }

        else if(parseInt(this._MIN_VALUE) > parseInt(this._MAX_VALUE)) {
            console.error(`the minimum value (${this._MIN_VALUE}) is larger than the maximum value (${this._MAX_VALUE})`);
        }
    }
}

customElements.define("mod-counter", CustomCounter);