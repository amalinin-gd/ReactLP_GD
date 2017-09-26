import Slider from './slider';

class App {
    constructor() {
        this.slider = new Slider();
    }
}

window.app = new App();

app.slider.init();