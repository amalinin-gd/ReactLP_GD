import DOMHelper from '../helpers/DOMHelper';
import PictureCollection from '../collections/pictureCollection';

export default class Zoomer {
    constructor(magnificationCoefficient) {
        this.domHelper = new DOMHelper();
        this.pictureCollection = PictureCollection.getInstance();
        this.magnificationCoefficient = magnificationCoefficient;
        this.zoomingAreaRectangleWidth = 100;
        this.zoomingAreaRectangleHeight = 150;
        this.zoomingAreaRectangleSemiWidth = this.zoomingAreaRectangleWidth / 2;
        this.zoomingAreaRectangleSemiHeight = this.zoomingAreaRectangleHeight / 2;
        this.zoomedPictureWidth = this.zoomingAreaRectangleWidth * this.magnificationCoefficient;
        this.zoomedPictureHeight = this.zoomingAreaRectangleHeight * this.magnificationCoefficient;
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
        let pictureElementSizes = this.domHelper.getElementSizes(this.pictureElement);
        let backgroundWidth = pictureElementSizes.width * this.magnificationCoefficient;
        let backgroundHeight = pictureElementSizes.height * this.magnificationCoefficient;

        this.zoomedPictureElement = document.createElement('div');

        this.zoomedPictureElement.style.position = 'absolute';
        this.zoomedPictureElement.style.zIndex = 2;
        this.zoomedPictureElement.style.top = '0';
        this.zoomedPictureElement.style.right = `-${this.zoomedPictureWidth}px`;
        this.zoomedPictureElement.style.width = `${this.zoomedPictureWidth}px`;
        this.zoomedPictureElement.style.height = `${this.zoomedPictureHeight}px`;
        this.zoomedPictureElement.style.border = '2px solid #ffd403';
        this.zoomedPictureElement.style.backgroundRepeat = 'no-repeat';
        this.zoomedPictureElement.style.backgroundSize = `${backgroundWidth}px ${backgroundHeight}px`;
        this.zoomedPictureElement.style.visibility = 'hidden';

        this.pictureContainerElement.appendChild(this.zoomedPictureElement);
    }

    createZoomingAreaRectangleElement() {
        this.zoomingAreaRectangleElement = document.createElement('div');

        this.zoomingAreaRectangleElement.style.position = 'absolute';
        this.zoomingAreaRectangleElement.style.width = `${this.zoomingAreaRectangleWidth}px`;
        this.zoomingAreaRectangleElement.style.height = `${this.zoomingAreaRectangleHeight}px`;
        this.zoomingAreaRectangleElement.style.border = '2px solid #ffd403';
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
            this.updateZoomingRectanglePosition(mouseCoordinates);
            this.updateZoomedPicture(mouseCoordinates);
            this.showZoomerComponents();
        } else {
            this.hideZoomerComponents();
        }
    }

    showZoomerComponents() {
        this.zoomingAreaRectangleElement.style.visibility = 'visible';
        this.zoomedPictureElement.style.visibility = 'visible';
    }

    hideZoomerComponents() {
        this.zoomingAreaRectangleElement.style.visibility = 'hidden';
        this.zoomedPictureElement.style.visibility = 'hidden';
    }

    updateZoomingRectanglePosition(mouseCoordinates) {
        this.zoomingAreaRectangleElement.style.left = `${mouseCoordinates.x - this.zoomingAreaRectangleSemiWidth}px`;
        this.zoomingAreaRectangleElement.style.top = `${mouseCoordinates.y - this.zoomingAreaRectangleSemiHeight}px`;
    }

    updateZoomedPicture(mouseCoordinates) {
        let initialPicture = this.pictureCollection.getCurrent();
        let backgroundPosition = this.calculateZoomedPictureBackgroundPosition(mouseCoordinates);

        this.zoomedPictureElement.style.backgroundImage = `url(pages/product/${initialPicture})`;
        this.zoomedPictureElement.style.backgroundPosition = `${backgroundPosition.x}px ${backgroundPosition.y}px`;
    }

    calculateZoomedPictureBackgroundPosition(mouseCoordinates) {
        let x = -((mouseCoordinates.x * this.magnificationCoefficient) - (this.zoomedPictureWidth / 2));
        let y = -((mouseCoordinates.y * this.magnificationCoefficient) - (this.zoomedPictureHeight / 2));

        return { x, y };
    }

    isZoomingRectangleFits(mouseCoordinates) {
        let pictureElementRect = this.pictureElement.getBoundingClientRect();

        return (mouseCoordinates.x >= this.zoomingAreaRectangleSemiWidth
            && mouseCoordinates.x <= (pictureElementRect.width - this.zoomingAreaRectangleSemiWidth))
            && (mouseCoordinates.y >= this.zoomingAreaRectangleSemiHeight
            && mouseCoordinates.y <= (pictureElementRect.height - this.zoomingAreaRectangleSemiHeight));
    }
}