import Slider from './slider/slider';
import Zoomer from './zoomer/zoomer';
import ReviewEditor from './reviewEditor/reviewEditor';

class App {
    constructor() {
        let magnificationIndex = 2;

        this.slider = new Slider();
        this.zoomer = new Zoomer(magnificationIndex);
        this.reviewEditorElement = new ReviewEditor();
    }
}

window.app = new App();
app.slider.init();
app.zoomer.init();
app.reviewEditorElement.init();