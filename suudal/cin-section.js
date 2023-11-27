import './cin-seat.js';

class CinSection extends HTMLElement {
    constructor() {
        super();
        this.rows = parseInt(this.getAttribute("row")) || 5;
        this.col = parseInt(this.getAttribute("column")) || 5;
        this.egnee = parseInt(this.getAttribute("egnee")) || 5;
        this.innerHTML = this.#render();
    }

    #render() {
        let html = "";
        html += "<div class='mur'>";
        for (let index = 0; index < this.rows; index++) {
            html += "<div class='bagana'>";
            for (let c = 0; c < this.col; c++) {
                html += `<cin-seat data-row="${index}" data-column="${c}" data-egnee="${this.egnee}"></cin-seat>`;
            }
            html += "</div>";
        }
        html += "</div>";
        return html;
    }
}

customElements.define('cin-section', CinSection);
