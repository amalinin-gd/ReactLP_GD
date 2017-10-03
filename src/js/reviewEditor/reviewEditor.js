import StringHelper from '../helpers/stringHelper';
import DOMHelper from '../helpers/DOMHelper';

export default class ReviewEditor {
    constructor() {
        this.stringHelper = StringHelper.getInstance();
        this.domHelper = DOMHelper.getInstance();
        this.editorEnabled = false;
        this.selectedText = '';
        this.selectionStart = null;
        this.selectionEnd = null;
    }

    init() {
        this.reviewLinkElement = document.getElementById('review-link');
        this.reviewEditorElement = document.getElementById('review-editor');

        if (this.reviewLinkElement) {
            this.reviewLinkElement.addEventListener('click', this.onReviewLinkClick.bind(this));
        }

        this.initEditor();
    }

    onReviewLinkClick() {
        if (!this.editorEnabled) {
            this.showEditor();
        }
    }

    initEditor() {
        if (!this.reviewEditorElement) {
            return;
        }

        this.cacheElements();
        this.addEventHandlers();
    }

    hideEditor() {
        this.reviewLinkElement.className = 'review-link';
        this.reviewEditorElement.style.display = 'none';
    }

    showEditor() {
        this.reviewLinkElement.className = '';
        this.reviewEditorElement.style.display = 'block';
    }

    cacheElements() {
        this.userNameContainer = document.getElementById('user-name-container');
        this.reviewTextContainer = document.getElementById('review-text-container');
        this.reviewTextEditor = document.getElementById('review-text');
        this.avatarPreview = document.getElementById('avatar-preview');
        this.avatarUploader = document.getElementById('file');
        this.avatarPreviewLabel = document.getElementById('avatar-preview-label');
        this.userAvatarContainer = document.getElementById('user-avatar');
        this.productRatingEditor = document.getElementById('rate-product');
        this.productRatingContainer = document.getElementById('product-rating');
    }

    addEventHandlers() {
        this.attachEventHandler('user-name', 'input', this.onUserNameChange);
        this.attachEventHandler('review-text', 'input', this.onReviewTextChange);
        this.attachEventHandler('review-text', 'mouseup', this.onTextSelectChange);
        this.attachEventHandler('review-text', 'keyup', this.onTextSelectChange);
        this.attachEventHandler('cancel-btn', 'click', this.hideEditor);
        this.attachEventHandler('file', 'change', this.onAvatarFileSelected);
        this.attachEventHandler('emphasize-btn', 'click', this.setEmphasized);
        this.attachEventHandler('bold-btn', 'click', this.setBold);
        this.attachEventHandler('quote-btn', 'click', this.setQuote);
        this.attachEventHandler('rate-product', 'click', this.onRatingClick);
    }

    attachEventHandler(elementId, eventName, eventHandlerFn) {
        let element = document.getElementById(elementId);

        if (element) {
            element.addEventListener(eventName, eventHandlerFn.bind(this));
        }
    }

    onUserNameChange(e) {
        let text = e.target.value;
        let defaultText = 'your name';

        if (!text) {
            this.userNameContainer.innerHTML = defaultText;
            return;
        }

        this.userNameContainer.innerHTML = text;
    }

    onReviewTextChange() {
        this.reviewTextContainer.innerHTML = this.processReviewTextSource(this.reviewTextEditor.value);
    }

    onAvatarFileSelected(e) {
        let file = e.target.files[0];
        let fileReader = new FileReader();

        fileReader.onload = function (loadEvent) {
            this.avatarPreview.setAttribute('src', loadEvent.target.result);
            this.userAvatarContainer.setAttribute('src', loadEvent.target.result);
            this.avatarUploader.style.display = 'none';
            this.avatarPreview.style.display = 'inline-block';
            this.avatarPreviewLabel.style.display = 'inline-block';
        }.bind(this);

        fileReader.readAsDataURL(file);
    }

    onTextSelectChange(e) {
        this.selectedText = document.getSelection().toString();
        this.selectionStart = e.target.selectionStart;
        this.selectionEnd = e.target.selectionEnd;
    }

    setEmphasized() {
        this.tagSubstringAndDispatchInputEvent('i');
    }

    setBold() {
        this.tagSubstringAndDispatchInputEvent('b');
    }

    setQuote() {
        this.tagSubstringAndDispatchInputEvent('q');
    }

    tagSubstringAndDispatchInputEvent(tagName) {
        let text = this.reviewTextEditor.value;
        let formattedSubstring = `[${tagName}]${this.selectedText}[/${tagName}]`;

        this.reviewTextEditor.value = this.stringHelper.replaceSubstringAt(text, formattedSubstring, this.selectionStart, this.selectionEnd);
        this.reviewTextEditor.dispatchEvent(new Event('input'));
    }

    processReviewTextSource(text) {
        let tagMetadata = {
            emphasized: {
                formatTagName: 'i',
                htmlTagName: 'span',
                className: 'emphasized',
                regex: /((\[i])((?!(\[\/i])).)*(\[\/i]))/g
            },
            bold: {
                formatTagName: 'b',
                htmlTagName: 'span',
                className: 'bold',
                regex: /((\[b])((?!(\[\/b])).)*(\[\/b]))/g
            },
            quote: {
                formatTagName: 'q',
                htmlTagName: 'p',
                className: 'quote',
                regex: /((\[q])((?!(\[\/q])).)*(\[\/q]))/g
            }
        };

        text = this.processTextForTag(text, tagMetadata.emphasized);
        text = this.processTextForTag(text, tagMetadata.bold);
        text = this.processTextForTag(text, tagMetadata.quote);

        return text;
    }

    processTextForTag(text, tagMetadata) {
        let processedText = text;
        let tagEntries = text.match(tagMetadata.regex);

        if (tagEntries) {
            processedText = this.stringHelper.replaceTags(
                text,
                tagEntries,
                tagMetadata.formatTagName,
                tagMetadata.htmlTagName,
                tagMetadata.className
            );
        }

        return processedText;
    }

    onRatingClick(e) {
        if (this.domHelper.elementHasClass(e.target, 'rating-star')) {
            let rating = e.target.getAttribute('data-rating');
            this.productRatingContainer.style.display = 'block';
            this.synchronizeRatings(rating);
        }
    }

    synchronizeRatings(ratingValue) {
        this.updateRating(this.productRatingEditor, ratingValue);
        this.updateRating(this.productRatingContainer, ratingValue);
    }

    updateRating(ratingElement, ratingValue) {
        let ratingStarElements = ratingElement.getElementsByClassName('rating-star');

        for (let i = 0; i < ratingStarElements.length; i++) {
            if (ratingStarElements[i].getAttribute('data-rating') <= ratingValue) {
                ratingStarElements[i].classList.add('rating-star-active');
            } else {
                ratingStarElements[i].classList.remove('rating-star-active');
            }
        }
    }
}