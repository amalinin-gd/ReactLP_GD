export default class DOMHelper {
    getMouseCoordinatesOverElement(element, mouseEvent) {
        let x, y;
        let pictureElementPosition = this.getElementPosition(element);

        x = mouseEvent.pageX - pictureElementPosition.x;
        y = mouseEvent.pageY - pictureElementPosition.y;

        return { x, y };
    }

    getElementPosition(element) {
        let x = 0,
            y = 0,
            inner = true;

        do {
            x += element.offsetLeft;
            y += element.offsetTop;

            let style = getComputedStyle(element, null);
            let borderTop = this.getNumericStyleProperty(style, 'border-top-width');
            let borderLeft = this.getNumericStyleProperty(style, 'border-left-width');

            y += borderTop;
            x += borderLeft;

            if (inner) {
                let paddingTop = this.getNumericStyleProperty(style, 'padding-top');
                let paddingLeft = this.getNumericStyleProperty(style, 'padding-left');

                y += paddingTop;
                x += paddingLeft;
            }

            inner = false;
        } while (element = element.offsetParent);

        return { x, y };
    }

    getElementSizes(element){
        let style = getComputedStyle(element, null);
        
        return {
            height: this.getNumericStyleProperty(style, 'height'),
            width: this.getNumericStyleProperty(style, 'width')
        };
    }

    getNumericStyleProperty(style, prop) {
        return parseInt(style.getPropertyValue(prop), 10);
    }
}