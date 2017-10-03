export default class ReviewEditor {
    constructor() {
        this.editorEnabled = false;
        this.selectedText = '';
        this.selectionStart = null;
        this.selectionEnd = null;
        this.isTextSelected = false;
    }

    init() {
        this.reviewLinkElement = document.getElementById('review-link');
        this.reviewEditorElement = document.getElementById('review-editor');

        if (this.reviewLinkElement) {
            this.reviewLinkElement.addEventListener('click', this.onReviewLinkClick.bind(this));
        }

        this.initEditor();

        //todo remove
        this.showEditor();
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

        this.cacheTargetElements();
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

    cacheTargetElements() {
        this.userNameContainer = document.getElementById('user-name-container');
        this.reviewTextContainer = document.getElementById('review-text-container');
        this.reviewTextEditor = document.getElementById('review-text');
        this.avatarPreview = document.getElementById('avatar-preview');
        this.avatarUploader = document.getElementById('file');
        this.avatarPreviewLabel = document.getElementById('avatar-preview-label');
        this.userAvatarContainer = document.getElementById('user-avatar');
        this.emphasizeBtn = document.getElementById('emphasize-btn');
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
    }

    attachEventHandler(elementId, eventName, eventHandlerFn) {
        let element = document.getElementById(elementId);

        if (element) {
            element.addEventListener(eventName, eventHandlerFn.bind(this));
        }
    }

    onUserNameChange(e) {
        let text = e.target.value;

        if (!text) {
            this.userNameContainer.innerHTML = 'your name';
            return;
        }

        this.userNameContainer.innerHTML = text;
    }

    onReviewTextChange() {
        this.reviewTextContainer.innerHTML = this.convertReviewText(this.reviewTextEditor.value);
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
        this.tagReviewSubstring('i');
    }

    setBold() {
        this.tagReviewSubstring('b');
    }

    setQuote() {
        this.tagReviewSubstring('q');
    }

    tagReviewSubstring(tagName) {
        let text = this.reviewTextEditor.value;
        let formattedSubstring = `[${tagName}]${this.selectedText}[/${tagName}]`;
        //todo move to a helper
        let updatedText = text.substr(0, this.selectionStart) + formattedSubstring + text.substr(this.selectionEnd);
        this.reviewTextEditor.value = updatedText;
        this.reviewTextEditor.dispatchEvent(new Event('input'));
    }


    convertReviewText(sourceText) {
        let emphasized = sourceText.match(/((\[i])((?!(\[\/i])).)*(\[\/i]))/g);
        //let bold = sourceText.match(/(\[b]).*(\[\/b])/g);
        //let quoted = sourceText.match(/(\[q]).*(\[\/q])/g);
        let newText = sourceText.slice();


        if (emphasized) {
            emphasized.forEach((formattedString) => {
                let stringValue = formattedString.replace('[i]', '');
                stringValue = stringValue.replace('[/i]', '');

                let taggedString = `<span class="emphasized">${stringValue}</span>`;

                newText = newText.replace(formattedString, taggedString);
            });
        }

        return newText;
    }
}