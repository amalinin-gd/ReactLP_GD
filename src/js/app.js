import Slider from './slider/slider';
import Zoomer from './zoomer/zoomer';

class App {
    constructor() {
        this.slider = new Slider();
        this.zoomer = new Zoomer(2);
    }
}

window.app = new App();
app.slider.init();
app.zoomer.init();