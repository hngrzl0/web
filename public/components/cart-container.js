class CartContainer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<section id="test"></section>`;
        this.cartDataKey = 'cartData';
    }

    connectedCallback() {
        this.loadCartData();

        document.addEventListener("addToCart", (e) => {
            const { title, price, quantity } = e.detail;
            if (quantity > 0) {
                this.renderOrder(title, price, quantity);
            } else {
                this.removeOrder(title);
            }

            this.calculateTotalCost();
            this.saveCartData();
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
        this.calculateTotalCost();
    }

    calculateTotalCost() {
        const cart = this.querySelector("#test");
        const items = cart.querySelectorAll('one-cart');

        let totalCost = 0;
        items.forEach(item => {
            const itemPrice = parseFloat(item.getAttribute('price').replace(',', '')); 
            const itemQuantity = parseInt(item.getAttribute('quantity'));
            totalCost += itemPrice * itemQuantity;
        });

        const sumCostElement = document.getElementById('sum_cost');
        if (sumCostElement) {
            sumCostElement.textContent = `${totalCost.toLocaleString()}₮`; 
        }
    }

    saveCartData() {
        const cart = this.querySelector("#test");
        const items = cart.querySelectorAll('one-cart');

        const cartData = [];
        items.forEach(item => {
            const title = item.getAttribute('data-title');
            const price = item.getAttribute('price');
            const quantity = item.getAttribute('quantity');
            cartData.push({ title, price, quantity });
        });

        localStorage.setItem(this.cartDataKey, JSON.stringify(cartData));
    }

    loadCartData() {
        const savedData = localStorage.getItem(this.cartDataKey);
        if (savedData) {
            const cartData = JSON.parse(savedData);
            cartData.forEach(({ title, price, quantity }) => {
                this.renderOrder(title, price, quantity);
            });

            this.calculateTotalCost();
        }
    }

    disconnectedCallback() {}

    attributeChangedCallback() {}
}

window.customElements.define("cart-container", CartContainer);
