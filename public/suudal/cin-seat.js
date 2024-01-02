//select_chair_number' classd bga buh elementuudig avch hadgalah
const suudalInputs = document.getElementsByClassName('select_chair_number');
class CinSeat extends HTMLElement {
    constructor() {
        super(); //superclass iin constructor duudagdna.
        //hergtei ugudluudee todrhoilno.
        this.id = "FFF";
        this.occupied = false;
    }
    //DOM-d holbogdoh uyd suudluuda init hiine
    connectedCallback() {
        this.init();
    }
    //suudal initialize hiih method
    init() {
        //suudlin ogogdliig attribute eer avah
        this.id = this.getAttribute("data-id");
        this.occupied = this.getAttribute("data-tuluw") === "true"; 
        //suudlaa renderleh
        this.#render();
        //event handler tohiruulah
        this.setupCheckboxEvent();
    }

    #render() {
        this.innerHTML = `
            <label>
                <input type='checkbox' ${this.occupied ? 'checked' : ''} ${this.occupied ? 'disabled' : ''}>
                <suudal>
                    <img width="50" height="50" class="image1" slot="suudal" src="img_ts/red.png">
                </suudal>
                <suudal>
                    <img width="50" height="50" class="image2"  slot="suudal" src="img_ts/blue.png">
                </suudal>
                <suudal>
                    <img width="50" height="50" class="image3"  slot="suudal" src="img_ts/yellow.png">
                </suudal>
            </label>`;
        
        const image1 = this.querySelector('.image1');
        const image2 = this.querySelector('.image2');
        const image3 = this.querySelector('.image3');

        if (image1 && image2 && image3) {
            if (this.occupied) {
                //songoh bolomjgui suudluud buyu ulaan suudluud
                image1.style.display = 'block';
                image2.style.display = 'none';
                image3.style.display = 'none';
            } else {
                //songoh bolomjtoi suudluud buyu tsenher suudluud
                image1.style.display = 'none';
                image2.style.display = 'block';
                image3.style.display = 'none';
            }
        }
    }
    //suudal checkleh uydeh eventiig zohicuulah method
    setupCheckboxEvent() {
        //checkboxuudaa avah
        const checkbox = this.querySelector('input[type="checkbox"]');
        if (checkbox) {
            //change eventiig sonsoh
            checkbox.addEventListener('change', () => {
                if (!this.occupied) {
                    let tuluw = checkbox.checked;
                    const image1 = this.querySelector('.image1');
                    const image2 = this.querySelector('.image2');
                    const image3 = this.querySelector('.image3');
                    
                    if (image1 && image2 && image3) {
                        if (tuluw) {
                            //checkbox checklegdsn uyd suudla shar bolgoh 
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
    //suudalInputs iin duplicateuudig handle hiih method
    Duplicates() {
        //suudalInputsiin utga avah
        const inputString = suudalInputs[0].innerText;
        const elements = inputString.split(' ');

        const countMap = {};
        const oddDuplicates = [];
        //elementuuder aylaj count iig nemeh
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
