class OneCart extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <section id="food_drinks_cost">
            <p class="name_of_food">${this.getAttribute("title")}</p>
            <p>1</p>
            <p>${this.getAttribute("price")}₮</p>
        </section>
        `;
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    static get observedAttributes() {
        return ['title', 'price'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            this.querySelector('.name_of_food').textContent = newValue;
        } else if (name === 'price') {
            this.querySelector('p:last-child').textContent = `${newValue}₮`;
        }
    }
}

window.customElements.define("one-cart", OneCart);
