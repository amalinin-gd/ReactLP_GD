//Shareable collection (singletone) that stores pictures for the slider
export default class PictureCollection {
    constructor() {
        this.pictures = [
            '1.jpg',
            '2.jpg',
            '3.jpg'
        ];

        this.currentPictureIndex = 0;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new PictureCollection();
        }

        return this.instance;
    }

    getCurrent() {
        return this.pictures[this.currentPictureIndex];
    }

    getNext() {
        let result;

        this.currentPictureIndex++;
        result = this.pictures[this.currentPictureIndex];

        if (!result) {
            this.currentPictureIndex--;
            return null;
        }

        return result;
    }

    getPrevious() {
        let result;

        this.currentPictureIndex--;
        result = this.pictures[this.currentPictureIndex];

        if (!result) {
            this.currentPictureIndex++;
            return null;
        }

        return result;
    }

    isNextAvailable() {
        return !!this.pictures[this.currentPictureIndex + 1];
    }

    isPreviousAvailable() {
        return !!this.pictures[this.currentPictureIndex - 1];
    }
}