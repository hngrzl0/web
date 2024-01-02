class OneProduct extends HTMLElement {
    constructor() {
        super(); //superclass iin baiguulagch duudagdna.
        this.quantity = 0;
        //inner htmld n beldsn html utgaa ugnu. attribute aar damjuulan ugugdluu avna.
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
    //element DOM-d holbogdhd shuud duudagdh method
    connectedCallback() {
        // nemeh hasah buttonoo avah
        const incrementButton = this.querySelector('#increment');
        const decrementButton = this.querySelector('#decrement');
        //nemeh hasah buttonuudd event listener nemeh
        incrementButton.addEventListener("click", () => {
            //nemeh buttond click event yvgdhd toog 1r nemj, delgetsed shinechlelt hiij, addToCart eventd ilgeene.
            this.quantity += 1;
            this.updateQuantity();
            this.dispatchEventToCart();
        });
        decrementButton.addEventListener("click", () => {
            //hasah buttond click event yvgdhd toog 1r hasj, delgetsed shinechlelt hiij, addToCart eventd ilgeene.
            if (this.quantity > 0) {
                this.quantity -= 1;
                this.updateQuantity();
                this.dispatchEventToCart();
            }
        });
    }
    //too shirheg shinechleh method
    updateQuantity() {
        const quantityElement = this.querySelector('span');
        quantityElement.textContent = this.quantity;
    }
    //addToCart custom eventiig title price quantity giin hamt dispatch hiih method.  
    dispatchEventToCart() {
        const event = new CustomEvent("addToCart", {
            detail: {
                title: this.getAttribute("title"),
                price: this.getAttribute("price"),
                quantity: this.quantity,
            },
        });
        //addToCart eventiig busd hesegt notify hiih
        document.dispatchEvent(event);
    }
    //element DOM-s removelgdhd duudagdh method
    disconnectedCallback() {
        // nemeh hasah buttonoo avah    
        const incrementButton = this.querySelector('#increment');
        const decrementButton = this.querySelector('#decrement');
        //eventlistenet uude ustgah 
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
}
window.customElements.define("one-product", OneProduct);
