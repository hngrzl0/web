class OneProduct extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <article>
            <img src="${this.getAttribute("img")}" alt="ice cream" >
            <h6>${this.getAttribute("title")}</h6>
            <p>${this.getAttribute("price")}₮</p>
            <div class="counts_of_fd">
                <button id="decrement">-</button>
                <span>0</span>
                <button id="increment">+</button>
            </div>
        </article>
        `;

        // Store a reference to the button during construction
        this.addButtonListener();
    }

    addButtonListener() {
        const addButton = this.querySelector('#increment');
        addButton.addEventListener("click", () => {
            const event = new CustomEvent("addToCart", {
                detail: {
                    title: this.getAttribute("title"),
                    price: this.getAttribute("price")
                }
            });
            document.dispatchEvent(event);
            console.log("aaaa");
        });
    }

    connectedCallback() {
        // Reattach event listener in case the element was disconnected and reconnected
        this.addButtonListener();
    }

    disconnectedCallback() {
        // Cleanup tasks can be added here if needed
    }

    attributeChangedCallback() {
        // Handle attribute changes if needed
    }
}

window.customElements.define("one-product", OneProduct);
