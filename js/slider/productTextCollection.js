export default class ProductTextCollection {
    constructor() {
        this.stringsCollection = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet, consectetur adipiscing elit, ',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        ];

        this.currentStringIndex = 0;
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