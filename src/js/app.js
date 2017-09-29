import Slider from './slider/slider';
import Zoomer from './zoomer/zoomer';
import ReviewEditor from './reviewEditor/reviewEditor';

class App {
    constructor() {
        this.slider = new Slider();
        this.zoomer = new Zoomer(2);
        this.reviewEditorElement = new ReviewEditor();
    }
}

window.app = new App();
app.slider.init();
app.zoomer.init();
app.reviewEditorElement.init();