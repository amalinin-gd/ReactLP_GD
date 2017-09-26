import DOMHelper from '../helpers/DOMHelper';

export default class Zoomer {
    constructor() {
        this.domHelper = new DOMHelper();
        this.zoomingAreaRectangleWidth = 100;
        this.zoomingAreaRectangleHeight = 150;
        this.zoomingAreaRectangleSemiWidth = this.zoomingAreaRectangleWidth / 2;
        this.zoomingAreaRectangleSemiHeight = this.zoomingAreaRectangleHeight / 2;
        this.zoomedPictureWidth = 200;
        this.zoomedPictureHeight = 300;
    }

    init() {
        this.pictureContainerElement = document.getElementById('picture-container');
        this.pictureElement = document.getElementById('product-picture');

        if (!this.pictureContainerElement || !this.pictureContainerElement) {
            return;
        }

        this.createZoomedPictureElement();
        this.createZoomingAreaRectangleElement();
        this.addEventHandlers();
    }

    createZoomedPictureElement() {
        this.zoomedPictureElement = document.createElement('div');

        this.zoomedPictureElement.style.position = 'absolute';
        this.zoomedPictureElement.style.top = '20px';
        this.zoomedPictureElement.style.right = `-${this.zoomedPictureWidth}px`;
        this.zoomedPictureElement.style.width = `${this.zoomedPictureWidth}px`;
        this.zoomedPictureElement.style.height = `${this.zoomedPictureHeight}px`;
        this.zoomedPictureElement.style.border = '2px solid #ffff00';
        this.zoomedPictureElement.style.visibility = 'hidden';

        this.pictureContainerElement.appendChild(this.zoomedPictureElement);
    }

    createZoomingAreaRectangleElement() {
        this.zoomingAreaRectangleElement = document.createElement('div');

        this.zoomingAreaRectangleElement.style.position = 'absolute';
        this.zoomingAreaRectangleElement.style.width = `${this.zoomingAreaRectangleWidth}px`;
        this.zoomingAreaRectangleElement.style.height = `${this.zoomingAreaRectangleHeight}px`;
        this.zoomingAreaRectangleElement.style.border = '2px solid #ffff00';
        this.zoomingAreaRectangleElement.style.backgroundColor = '#ffffff';
        this.zoomingAreaRectangleElement.style.opacity = '0.7';
        this.zoomingAreaRectangleElement.style.visibility = 'hidden';

        this.pictureElement.appendChild(this.zoomingAreaRectangleElement);
    }

    addEventHandlers() {
        this.pictureElement.addEventListener('mousemove', this.renderZoomerComponents.bind(this));
    }

    renderZoomerComponents(e) {
        let mouseCoordinates = this.domHelper.getMouseCoordinatesOverElement(this.pictureElement, e);

        if (this.isZoomingRectangleFits(mouseCoordinates)) {
            this.zoomingAreaRectangleElement.style.left = `${mouseCoordinates.x - this.zoomingAreaRectangleSemiWidth}px`;
            this.zoomingAreaRectangleElement.style.top = `${mouseCoordinates.y - this.zoomingAreaRectangleSemiHeight}px`;
            this.zoomingAreaRectangleElement.style.visibility = 'visible';
            this.zoomedPictureElement.style.visibility = 'visible';
        } else {
            this.zoomingAreaRectangleElement.style.visibility = 'hidden';
            this.zoomedPictureElement.style.visibility = 'hidden';
        }
    }

    isZoomingRectangleFits(mouseCoordinates) {
        let pictureElementRect = this.pictureElement.getBoundingClientRect();

        return (mouseCoordinates.x > this.zoomingAreaRectangleSemiWidth
            && mouseCoordinates.x < (pictureElementRect.width - this.zoomingAreaRectangleSemiWidth))
            && (mouseCoordinates.y > this.zoomingAreaRectangleSemiHeight
            && mouseCoordinates.y < (pictureElementRect.height - this.zoomingAreaRectangleSemiHeight));
    }
}