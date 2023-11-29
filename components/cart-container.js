class CartContainer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<section id="test"></section>`;
    }

    connectedCallback() {
        document.addEventListener("addToCart", (e) => {
            const { title, price, quantity } = e.detail;
            if (quantity > 0) {
                this.renderOrder(title, price, quantity);
            } else {
                this.removeOrder(title);
            }
        });
    }

    renderOrder(title, price, quantity) {
        const cart = this.querySelector("#test");
        const existingItem = cart.querySelector(`[data-title="${title}"]`);
    
        if (existingItem) {
            existingItem.querySelector('.quantity').textContent = quantity;
            existingItem.setAttribute('quantity', quantity);
        } else {
            cart.insertAdjacentHTML(
                "beforeend",
                `<one-cart data-title="${title}" title="${title}" price="${price}" quantity="${quantity}"></one-cart>`
            );
        }
    }

    removeOrder(title) {
        const cart = this.querySelector("#test");
        const itemToRemove = cart.querySelector(`[data-title="${title}"]`);
        if (itemToRemove) {
            itemToRemove.remove();
        }
    }

    disconnectedCallback() {}

    attributeChangedCallback() {}
}

window.customElements.define("cart-container", CartContainer);