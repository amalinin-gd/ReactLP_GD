//Shareable collection (singletone) that stores product descriptions for the slider
export default class ProductTextCollection {
    constructor() {
        this.stringsCollection = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ];

        this.currentStringIndex = 0;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ProductTextCollection();
        }

        return this.instance;
    }

    getCurrent() {
        return this.stringsCollection[this.currentStringIndex];
    }

    getNext() {
        let result;

        this.currentStringIndex++;
        result = this.stringsCollection[this.currentStringIndex];

        if (!result) {
            this.currentStringIndex--;
            return null;
        }

        return result;
    }

    getPrevious() {
        let result;

        this.currentStringIndex--;
        result = this.stringsCollection[this.currentStringIndex];

        if (!result) {
            this.currentStringIndex++;
            return null;
        }

        return result;
    }
}