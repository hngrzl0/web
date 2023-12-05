import './cin-seat.js';
class CinSection extends HTMLElement {
    constructor() {
        super();
        this.row = parseInt(this.getAttribute("row")) || 5;
        this.col = parseInt(this.getAttribute("column")) || 5;
        this.egnee = parseInt(this.getAttribute("egnee")) || 5;
        this.occupied = false;
        this.innerHTML = "";
        this.id = "FFF";
        this.fetchAndRender();
    }
    async fetchAndRender() {
        const seatsResponse = await fetch('seats.json');
        const seats = await seatsResponse.json();
        let html = "<div class='mur'>";
        for (let index = 0; index < this.row; index++) {
            html += "<div class='bagana'>";
            for (let c = 0; c < this.col; c++) {
                const seatData = seats.find(seat => seat.row === index && seat.col === c && seat.egnee === this.egnee);
                if (seatData) {
                    this.occupied = seatData.occupied;
                    this.id = seatData.id;
                    html += `<cin-seat data-id="${this.id}" data-tuluw="${this.occupied}"></cin-seat>`;
                    console.log(this.id)
                }
            }
            html += "</div>";
        }
        html += "</div>";
        this.innerHTML = html; // Set the innerHTML after the fetch operations complete
    }
}
customElements.define('cin-section', CinSection);