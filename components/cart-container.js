class CartContainer extends HTMLElement {
    constructor() {
        super();
        console.log("daragdlaa");
        this.innerHTML = `
        <section id="test">
        </section>
        `;
    }

    connectedCallback() {
        document.addEventListener("addToCart", (e) => {
            const { title, price } = e.detail;
            this.renderOrder(title, price);
        });
    }

    renderOrder(title, price) {
        const cart = this.querySelector("#test"); // Use this.querySelector instead of document.getElementById
        cart.insertAdjacentHTML(
            "beforeend",
            `<one-cart title="${title}" price="${price}"></one-cart>`
        );
    }

    disconnectedCallback() {
        // Code to run when the element is removed from the DOM
    }

    attributeChangedCallback() {
        // Handle attribute changes if needed
    }
}

window.customElements.define("cart-container", CartContainer);
