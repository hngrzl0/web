class CinSeat extends HTMLElement {
    constructor() {
        super();
        this.row = 0;
        this.column = 0;
        this.egnee = 0;
        this.occupied = false;
        this.occupied1 = false;
    }

    connectedCallback() {
        this.init();
    }

    init() {
        // Retrieve seat information from attributes
        this.row = parseInt(this.getAttribute("data-row")) || 0;
        this.column = parseInt(this.getAttribute("data-column")) || 0;
        this.egnee = parseInt(this.getAttribute("data-egnee")) || 0;

        // Fetch seat data from JSON (Assuming you're using a web server, otherwise, you may need additional setup)
        fetch('seats.json')
            .then(response => response.json())
            .then(seats => {
                const seatData = seats.find(seat => seat.row === this.row && seat.column === this.column && seat.egnee === this.egnee);
                if (seatData) {
                    this.occupied = seatData.occupied;
                    this.updateCheckboxState();
                }
            });

        this.#render();
        this.setupCheckboxEvent();
    }
    #render() {
        this.innerHTML = `
        <label>
            <input type='checkbox' ${this.occupied ? 'disabled' : ''}>
            <img width="50" height="50" class="image1" src="img_ts/red.png" alt="Picture 1">
            <img width="50" height="50" class="image2" src="img_ts/blue.png" alt="Picture 2">
            <img width="50" height="50" class="image3" src="img_ts/yellow.png" alt="Picture 3">
        </label>`;

        // Initially hide images 2 and 3
        const image2 = this.querySelector('.image2');
        const image3 = this.querySelector('.image3');
        if (image2 && image3) {
            image2.style.display = 'none';
            image3.style.display = 'none';
        }
    }

    updateCheckboxState() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        const image1 = this.querySelector('.image1');
        const image2 = this.querySelector('.image2');
        const image3 = this.querySelector('.image3');

        if (checkbox && image1 && image2 && image3) {
            checkbox.checked = this.occupied;

            if (this.occupied) {
                // Show image 1 and hide images 2 and 3 when selected
                image1.style.display = 'block';
                image2.style.display = 'none';
                image3.style.display = 'none';
                checkbox.disabled = this.occupied;
            } else {
                // Hide image 1 and show images 2 and 3 when not selected
                image1.style.display = 'none';
                image2.style.display = 'block';
                image3.style.display = 'none';
            }
            // Disable the checkbox after selection
        }
    }
    updateCheckbox() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        const image1 = this.querySelector('.image1');
        const image2 = this.querySelector('.image2');
        const image3 = this.querySelector('.image3');

        if (checkbox && image1 && image2 && image3) {
            checkbox.checked = this.occupied1;

            if (this.occupied1) {
                // Show image 1 and hide images 2 and 3 when selected
                image1.style.display = 'none';
                image2.style.display = 'none';
                image3.style.display = 'block';
            } else {
                // Hide image 1 and show images 2 and 3 when not selected
                image1.style.display = 'none';
                image2.style.display = 'block';
                image3.style.display = 'none';
            }
            // Disable the checkbox after selection
        }
    }
    setupCheckboxEvent() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                if (!this.occupied) {
                    // Only update the state if it's not occupied
                    this.occupied1 = checkbox.checked;
                    this.updateCheckbox();
                }
            });
        }
    }
}

customElements.define('cin-seat', CinSeat);
