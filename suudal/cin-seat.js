const suudalInputs = document.getElementsByClassName('select_chair_number');
class CinSeat extends HTMLElement {
    constructor() {
        super();
        this.id = "FFF";
        this.occupied = false;
    }

    connectedCallback() {
        this.init();
    }

    init() {
        this.id = this.getAttribute("data-id");
        this.occupied = this.getAttribute("data-tuluw") === "true"; 
        console.log(this.id);

        this.#render();
        this.setupCheckboxEvent();
    }

    #render() {
        this.innerHTML = `
            <label>
                <input type='checkbox' ${this.occupied ? 'checked' : ''} ${this.occupied ? 'disabled' : ''}>
                <img width="50" height="50" class="image1" src="img_ts/red.png" alt="Picture 1">
                <img width="50" height="50" class="image2" src="img_ts/blue.png" alt="Picture 2">
                <img width="50" height="50" class="image3" src="img_ts/yellow.png" alt="Picture 3">
            </label>`;
        
        const image1 = this.querySelector('.image1');
        const image2 = this.querySelector('.image2');
        const image3 = this.querySelector('.image3');

        if (image1 && image2 && image3) {
            if (this.occupied) {
                image1.style.display = 'block';
                image2.style.display = 'none';
                image3.style.display = 'none';
            } else {
                image1.style.display = 'none';
                image2.style.display = 'block';
                image3.style.display = 'none';
            }
        }
    }

    setupCheckboxEvent() {
        const checkbox = this.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                if (!this.occupied) {
                    let tuluw = checkbox.checked;
                    const image1 = this.querySelector('.image1');
                    const image2 = this.querySelector('.image2');
                    const image3 = this.querySelector('.image3');
                    
                    if (image1 && image2 && image3) {
                        if (tuluw) {
                            image1.style.display = 'none';
                            image2.style.display = 'none';
                            image3.style.display = 'block';
                            if (suudalInputs.length > 0) {
                                suudalInputs[0].innerText += ' ' + this.id;
                                this.Duplicates();
                            }
                        } else {
                            image1.style.display = 'none';
                            image2.style.display = 'block';
                            image3.style.display = 'none';
                            if (suudalInputs.length > 0) {
                                suudalInputs[0].innerText += ' ' + this.id;
                                this.Duplicates();
                            }
                        }
                    }
                }
            });
        }
    }
    Duplicates() {
        const inputString = suudalInputs[0].innerText;
        const elements = inputString.split(' ');

        const countMap = {};
        const oddDuplicates = [];
    
        elements.forEach((element) => {
            countMap[element] = (countMap[element] || 0) + 1;
        });
        Object.keys(countMap).forEach((element) => {
            if (countMap[element] % 2 === 1) {
                oddDuplicates.push(element);
            }
        });
        suudalInputs[0].innerText = oddDuplicates.join(' ');
    }
    
}

customElements.define('cin-seat', CinSeat);
