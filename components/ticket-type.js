class TicketType extends HTMLElement {
    constructor() {
        super();
        this.quantity = 0;
        this.cost = 0;
        this.type = this.getAttribute('type') || 'Том Хүн';
        this.costPerTicket = parseFloat(this.getAttribute('cost')) || 15000;
        this.attachShadow({ mode: 'closed' });
        this.shadowRoot.innerHTML = `
        <style>
            li{
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: var(--color-gray);
                color: var(--color-gray);
                & p{
                    background-color: var(--color-gray);
                    color: var(--color-bright-gray);
                    font-weight: bold;
                    
                }
                & button{
                    background-color: var(--color-gray);
                    color: var(--color-bright-gray);
                    padding: 0.25em 0.5em;
                    margin: 0.1rem;
                    border-radius: 100%;
                    border: 1px solid ;
                }
                & span{
                    background-color: var(--color-gray);
                    color: var(--color-bright-gray);
                }
                & .cost{
                    color: var(--color-text-engiin);
                }
                & button + span{
                    margin: 0 -6rem 0 -6rem;
                }
            </style>
            <li id="ticketfor">
                <p>${this.type}</p>
                <button id="decrementBtn">-</button>
                <span>${this.quantity}</span>
                <button id="incrementBtn">+</button>
                <p class="cost">${this.calculateCost()}₮</p>
            </li>
        `;
    }

    connectedCallback() {
        const incrementButton = this.shadowRoot.getElementById('incrementBtn');
        const decrementButton = this.shadowRoot.getElementById('decrementBtn');

        incrementButton.addEventListener('click', () => {
            this.quantity += 1;
            this.updateQuantityAndCost();
            this.dispatchEventToCart();
        });

        decrementButton.addEventListener('click', () => {
            if (this.quantity > 0) {
                this.quantity -= 1;
                this.updateQuantityAndCost();
                this.dispatchEventToCart();
            }
        });

        this.updateQuantityAndCost(); 
    }

    updateQuantityAndCost() {
        this.updateQuantity();
        this.updateCost();

        this.dispatchEventToCart();
    }

    updateQuantity() {
        const quantityElement = this.shadowRoot.querySelector('span');
        quantityElement.textContent = this.quantity;
    }

    updateCost() {
        const costElement = this.shadowRoot.querySelector('.cost');
        costElement.textContent = `${this.calculateCost()}₮`;
    }

    calculateCost() {
        this.cost = this.quantity * this.costPerTicket;
        return this.cost;
    }

    dispatchEventToCart() {
        const event = new CustomEvent("addToCart", {
            detail: {
                title: this.getAttribute("type"),  
                price: this.getAttribute("cost"),  
                quantity: this.quantity,
            },
        });

        document.dispatchEvent(event);
    }

    disconnectedCallback() {
        const incrementButton = this.shadowRoot.getElementById('incrementBtn');
        const decrementButton = this.shadowRoot.getElementById('decrementBtn');

        incrementButton.removeEventListener('click', () => {
            this.quantity += 1;
            this.updateQuantityAndCost();
        });

        decrementButton.removeEventListener('click', () => {
            if (this.quantity > 0) {
                this.quantity -= 1;
                this.updateQuantityAndCost();
            }
        });
    }
}

customElements.define('ticket-type', TicketType);
