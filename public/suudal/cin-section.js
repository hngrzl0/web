import './cin-seat.js';//suudal iin custom element ee importloh
class CinSection extends HTMLElement {
    constructor() {
        super(); //superclass iin constructor duudagdna
        //egnee bagana sectionuuda todrhoilno attribute damjuulagu uyd default utga 5g avna
        this.row = parseInt(this.getAttribute("row")) || 5;
        this.col = parseInt(this.getAttribute("column")) || 5;
        this.egnee = parseInt(this.getAttribute("egnee")) || 5;
        this.occupied = false;
        this.innerHTML = "";
        this.id = "FFF";
        //json file aa fetch hiij renderlene
        this.fetchAndRender();
    }
    //suudlaa tataj avah renderleh method
    async fetchAndRender() {
        //seats.json oos suudliiha ugugdluudig tataj avna
        const seatsResponse = await fetch('seats.json');
        //json ugugdluu array bolgoj huvirgana
        const seats = await seatsResponse.json();
        //htmld renderlene
        let html = "<div class='mur'>"; //muriin container div
        // muruur looplene
        for (let index = 0; index < this.row; index++) {
            // mur burt bagana classtai div container renderlene
            html += "<div class='bagana'>";
            for (let c = 0; c < this.col; c++) {
                //odoogin mur bagana egneed tohiroj suudlin ugugdliig olno
                const seatData = seats.find(seat => seat.row === index && seat.col === c && seat.egnee === this.egnee);
                if (seatData) {
                    //hervee tuhain ugugdl oldvl shinechleed cin-seat elementiig renderlene
                    this.occupied = seatData.occupied;
                    this.id = seatData.id;
                    html += `<cin-seat data-id="${this.id}" data-tuluw="${this.occupied}"></cin-seat>`;
                }
            }
            html += "</div>";
        }
        html += "</div>";
        this.innerHTML = html; 
    }
}
customElements.define('cin-section', CinSection);