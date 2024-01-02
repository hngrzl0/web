class CartContainer extends HTMLElement {
    constructor() {
        super(); //superclass buyu HTMLElement iin baiguulagch duudagdna.
        this.innerHTML = `<section id="test"></section>`; //innerHTML iin utgad test idtai section tohiruulj ugnu.
        this.cartDataKey = 'cartData'; //sagsnii ugugdul hadgalah key 
    }
    //connectCallback tuhain element DOM-d holbogdsn uyd duudgddag method.
    connectedCallback() {
        this.loadCartData(); //sagsnii ugugdluu unshij bn 
        //addToCart Custom event ee sonsoj bn
        document.addEventListener("addToCart", (e) => {
            //extract hiih
            const { title, price, quantity } = e.detail;
            if (quantity > 0) {
                this.renderOrder(title, price, quantity);
            } else {
                //too n 0s baga bvl ustgah
                this.removeOrder(title);
            }
            this.calculateTotalCost();//niit une bodoh
            this.saveCartData();//sagnii ugugdluu local storage dee hadgalah
        });
    }
    //cart renderleh method
    renderOrder(title, price, quantity) {
        //sagsnii container elementiig avah
        const cart = this.querySelector("#test");
        //product iin title-aar orshij bga esehig shalgah
        const existingItem = cart.querySelector(`[data-title="${title}"]`);
        if (existingItem) {
            //product orshij bvl too shirhegiig n shinechleh
            existingItem.querySelector('.quantity').textContent = quantity;
            existingItem.setAttribute('quantity', quantity);
        } else {
            //product baihgui bvl shineer nemj renderleh
            cart.insertAdjacentHTML(
                "beforeend",
                `<one-cart data-title="${title}" title="${title}" price="${price}" quantity="${quantity}"></one-cart>`
            );
        }
    }
    //product cart aas ustgah method
    removeOrder(title) {
        //sagsnii container elementiig avah
        const cart = this.querySelector("#test");
        //ustgah productiig huvisagchid hadgalah
        const itemToRemove = cart.querySelector(`[data-title="${title}"]`);
        if (itemToRemove) {
            //tuhain product orshij baivl ustgah
            itemToRemove.remove();
        }
        //product ustsnii daraa niit une iig dahin bodoh
        this.calculateTotalCost();
    }
    //niit une tootsooloh method 
    calculateTotalCost() {
        //sagsnii container elementiig avah
        const cart = this.querySelector("#test");
        //sagsand bui productuudig avah
        const items = cart.querySelectorAll('one-cart');
        let totalCost = 0;
        items.forEach(item => {
            const itemPrice = parseFloat(item.getAttribute('price').replace(',', '')); //, arilgaj uniig float bolgoh
            const itemQuantity = parseInt(item.getAttribute('quantity')); // too hemjeeg int bolgoj avah
            totalCost += itemPrice * itemQuantity;
        });
        //niit une shinechleh
        const sumCostElement = document.getElementById('sum_cost');
        if (sumCostElement) {
            sumCostElement.textContent = `${totalCost.toLocaleString()}₮`; 
        }
    }
    //sagsn dahi medeelliig local storaged hadglh method 
    saveCartData() {
        //sagsnii container elementiig avah
        const cart = this.querySelector("#test");
        //sagsand bui productuudig avah
        const items = cart.querySelectorAll('one-cart');
        //arrayd hadgalah
        const cartData = [];
        items.forEach(item => {
            const title = item.getAttribute('data-title');
            const price = item.getAttribute('price');
            const quantity = item.getAttribute('quantity');
            cartData.push({ title, price, quantity });
        });
        //sagsnii datagaa json helberer local storaged hadgalah
        localStorage.setItem(this.cartDataKey, JSON.stringify(cartData));
    }
    //local storage tseverleh method
    clearLocalStorage() {
        localStorage.clear();
    }
    //local storage ees sagsnii datag avch renderleh method
    loadCartData() {
        //hadgalsn datagaa avah
        const savedData = localStorage.getItem(this.cartDataKey);
        if (savedData) {
            //hervee hadgalsn ugugdul bvl json oos huvirgaj renderleh
            const cartData = JSON.parse(savedData);
            cartData.forEach(({ title, price, quantity }) => {
                this.renderOrder(title, price, quantity);
            });
            //niit unee dahin toocooloh
            this.calculateTotalCost();
        }
    }
}
//component ee register hiih 
window.customElements.define("cart-container", CartContainer);
