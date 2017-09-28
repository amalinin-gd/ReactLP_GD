import PictureCollection from '../collections/pictureCollection';
import TextCollection from '../collections/productTextCollection';

export default class Slider {
    constructor() {
        this.pictureCollection = PictureCollection.getInstance();
        this.textCollection = TextCollection.getInstance();
    }

    init() {
        this.pictureElement = document.getElementById('product-picture');

        if (!this.pictureElement) {
            return;
        }

        this.setInitialPicture();
        this.setInitialText();
        this.configureButtons();
    }

    setInitialPicture() {
        let initialPicture = this.pictureCollection.getCurrent();

        this.pictureElement.style.backgroundImage = `url(pages/product/${initialPicture})`;
    }

    setInitialText(){
        let initialText;

        this.productTextElement = document.getElementById('product-text');

        if(!this.productTextElement){
            return;
        }

        initialText = this.textCollection.getCurrent();
        this.productTextElement.innerHTML = initialText;
    }

    configureButtons() {
        this.leftSlideButton = document.getElementById('slider-btn-left');
        this.rightSlideButton = document.getElementById('slider-btn-right');

        if (!this.leftSlideButton || !this.rightSlideButton) {
            return;
        }

        this.setButtonsVisibility();
        this.addEventHandlers();
    }

    setButtonsVisibility() {
        this.leftSlideButton.style.visibility =
            this.pictureCollection.isPreviousAvailable() ? 'visible' : 'hidden';

        this.rightSlideButton.style.visibility =
            this.pictureCollection.isNextAvailable() ? 'visible' : 'hidden';
    }

    addEventHandlers() {
        this.leftSlideButton.addEventListener('click', this.slideLeft.bind(this));
        this.rightSlideButton.addEventListener('click', this.slideRight.bind(this));
    }

    slideLeft() {
        let picture = this.pictureCollection.getPrevious();
        let text = this.textCollection.getPrevious();

        this.pictureElement.style.backgroundImage = `url(pages/product/${picture})`;
        this.changeTextWithSlide(text, '1000px');
        this.setButtonsVisibility();
    }

    slideRight() {
        let picture = this.pictureCollection.getNext();
        let text = this.textCollection.getNext();

        this.pictureElement.style.backgroundImage = `url(pages/product/${picture})`;
        this.changeTextWithSlide(text, '-1000px');
        this.setButtonsVisibility();
    }

    changeTextWithSlide(text, finalPosition){
        this.productTextElement.innerHTML = text;
        this.productTextElement.style.transition = '0.3s linear';
        this.productTextElement.style.left = finalPosition;

        setTimeout(() => {
            this.productTextElement.innerHTML = text;
            this.productTextElement.style.transition = 'none';
            this.productTextElement.style.left = "0";
        }, 300);
    }
}
