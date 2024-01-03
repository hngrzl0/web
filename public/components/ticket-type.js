class TicketType extends HTMLElement {
    constructor() {
        super();   //superclass iin constructor function duudagdna.
        //hergtei ugugdluude todorhoilno.
        this.quantity = 0;
        this.cost = 0;
        //attribute damjuulagdagu bvl default utgaar type aa tom hun cost oo 15k gj avna.
        this.type = this.getAttribute('type') || 'Том Хүн';
        this.costPerTicket = parseFloat(this.getAttribute('cost')) || 15000;
        //nuutslald zoriulj shadow DOM ashiglaj bolno. mode oo closed bolgovl inspect dr haragdahgui.
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            #ticketfor{
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
            <div id="ticketfor">
                <p>${this.type}</p>
                <button id="decrementBtn">-</button>
                <span>${this.quantity}</span>
                <button id="incrementBtn">+</button>
                <p class="cost">${this.calculateCost()}₮</p>
            </div>
        `;
    }
    //element DOM-d holbogdh uyd duudagdh method
    connectedCallback() {
        //nemeh hasah button avah
        const incrementButton = this.shadowRoot.getElementById('incrementBtn');
        const decrementButton = this.shadowRoot.getElementById('decrementBtn');
        //nemeh hasah buttond click event listener hiih
        incrementButton.addEventListener('click', () => {
            //nemeh buttond click event yvgdhd toog 1r nemj, delgetsed shinechlelt hiij, addToCart eventd ilgeene.
            this.quantity += 1;
            this.updateQuantityAndCost();
            this.dispatchEventToCart();
        });
        decrementButton.addEventListener('click', () => {
            //hasah buttond click event yvgdhd toog 1r hasj, delgetsed shinechlelt hiij, addToCart eventd ilgeene.
            if (this.quantity > 0) {
                this.quantity -= 1;
                this.updateQuantityAndCost();
                this.dispatchEventToCart();
            }
        });
        //une too hemjeegee shinechleh
        this.updateQuantityAndCost(); 
    }
    //une too hemjeegee shinechleh method
    updateQuantityAndCost() {
        this.updateQuantity(); //too hemjee shinechleh
        this.updateCost();//une shinechleh
        this.dispatchEventToCart();//cartd medegdh
    }
    //too hemjeeg shinechleh method
    updateQuantity() {
        const quantityElement = this.shadowRoot.querySelector('span');
        quantityElement.textContent = this.quantity;
    }
    //uneig bodoj shinechleh method
    updateCost() {
        const costElement = this.shadowRoot.querySelector('.cost');
        costElement.textContent = `${this.calculateCost()}₮`;
    }
    //ticketnii uneiig odoogin too hemjeeger urjuulj bodoh method
    calculateCost() {
        this.cost = this.quantity * this.costPerTicket;
        return this.cost;
    }
    ////addToCart custom eventiig ticketnii type cost iin hamt dispatch hiih method
    dispatchEventToCart() {
        const event = new CustomEvent("addToCart", {
            detail: {
                title: this.getAttribute("type"),  
                price: this.getAttribute("cost"),  
                quantity: this.quantity,
            },
        });
        document.dispatchEvent(event);//addToCart eventiig busd hesegt notify hiih
    }
    //element DOM-s removelgdhd duudagdh method
    disconnectedCallback() {
        // nemeh hasah buttonoo avah    
        const incrementButton = this.shadowRoot.getElementById('incrementBtn');
        const decrementButton = this.shadowRoot.getElementById('decrementBtn');
        //eventlistenet uude ustgah 
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
