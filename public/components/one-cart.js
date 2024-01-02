class OneCart extends HTMLElement {
    constructor() {
        super();//superclass iin constructor function duudah
        //inner HTMl -d n beltgesn html utgaa uguh
        this.innerHTML = `
            <section id="food_drinks_cost">
                <p class="name_of_food">${this.getAttribute("title")}</p>
                <p class="quantity">${this.getAttribute("quantity")}</p>
                <p>${this.getAttribute("price")}₮</p>
            </section>
        `;
    }
    //oorchloltod ashiglah attribute uudig ajiglah(observe hiih) method
    static get observedAttributes() {
        return ['title', 'price', 'quantity'];
    }
    //attribute uurchlugduhud duudagdah method
    attributeChangedCallback(name, oldValue, newValue) {
        //ali attribute uurhclgdsnig shalgah shinechleh
        if (name === 'title') {
            this.querySelector('.name_of_food').textContent = newValue;
        } else if (name === 'price') {
            this.querySelector('p:last-child').textContent = `${newValue}₮`;
        } else if (name === 'quantity') {
            this.querySelector('.quantity').textContent = newValue;
        }
    }
}
//component ee register hiih 
window.customElements.define("one-cart", OneCart);
