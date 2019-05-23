const template = document.createElement("template");
template.innerHTML = `
    <style>    
    .thumbnail-container {
        height: 90%;
        width: 95%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    
        border: 1px solid grey;
        border-radius: 3%;
        padding: 1%;
        box-shadow: 4px 4px 5px grey;
    }
    
    .thumbnail-container:hover {
        cursor: pointer;
    }

    ::slotted(img) {
        width: 90%;
        margin: 5% 2% 0;
        padding: 5%;
    }
    
    .thumbnail-image {
        width: 90%;
        margin: 5% 2% 0;
        padding: 5%;
    }
    
    .thumbnail-title, ::slotted(h2) {
        font-weight: bold;
        text-overflow: ellipsis;
        text-align: center;
        margin: 3% 5% 5%;
        padding-bottom: 5%;
    }
    </style>
    <div class="thumbnail-container">
        <slot name="thumbnail-image"><img src="../assets/logo.png" alt="space image" class="thumbnail-image"/></slot>
        <slot name="thumbnail-title"><h2 class="thumbnail-title">Title</h2></slot>
    </div>
`;

class ImageThumbnail extends HTMLElement {
    // Constructor
    constructor() {
        // Inheritance
        super();

        this.root = this.attachShadow({ mode:"open" });
        this.root.appendChild(template.content.cloneNode(true));
    }
}

customElements.define("image-thumbnail", ImageThumbnail);