class OneProduct extends HTMLElement {
    constructor() {
        super();
        this.quantity = 0;

        this.innerHTML = `
            <article>
                <img src="${this.getAttribute("img")}" alt="ice cream">
                <h6>${this.getAttribute("title")}</h6>
                <p>${this.getAttribute("price")}₮</p>
                <div class="counts_of_fd">
                    <button id="decrement">-</button>
                    <span>${this.quantity}</span>
                    <button id="increment">+</button>
                </div>
            </article>
        `;
    }

    connectedCallback() {
        // Add event listeners here, in the connectedCallback
        const incrementButton = this.querySelector('#increment');
        const decrementButton = this.querySelector('#decrement');

        incrementButton.addEventListener("click", () => {
            this.quantity += 1;
            this.updateQuantity();
            this.dispatchEventToCart();
        });

        decrementButton.addEventListener("click", () => {
            if (this.quantity > 0) {
                this.quantity -= 1;
                this.updateQuantity();
                this.dispatchEventToCart();
            }
        });
    }

    updateQuantity() {
        const quantityElement = this.querySelector('span');
        quantityElement.textContent = this.quantity;
    }

    dispatchEventToCart() {
        const event = new CustomEvent("addToCart", {
            detail: {
                title: this.getAttribute("title"),
                price: this.getAttribute("price"),
                quantity: this.quantity,
            },
        });
        document.dispatchEvent(event);
    }

    disconnectedCallback() {
        // Remove event listeners here, in the disconnectedCallback if needed
        const incrementButton = this.querySelector('#increment');
        const decrementButton = this.querySelector('#decrement');

        incrementButton.removeEventListener("click", () => {
            this.quantity += 1;
            this.updateQuantity();
            this.dispatchEventToCart();
        });

        decrementButton.removeEventListener("click", () => {
            if (this.quantity > 0) {
                this.quantity -= 1;
                this.updateQuantity();
                this.dispatchEventToCart();
            }
        });
    }

    attributeChangedCallback() {}
}

window.customElements.define("one-product", OneProduct);
