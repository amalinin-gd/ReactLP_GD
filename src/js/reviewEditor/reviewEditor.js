export default class ReviewEditor {
    constructor() {
        this.editorEnabled = false;
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
        this.avatarPreview = document.getElementById('avatar-preview');
        this.avatarUploader = document.getElementById('file');
        this.avatarPreviewLabel = document.getElementById('avatar-preview-label');
        this.userAvatarContainer = document.getElementById('user-avatar');
    }

    addEventHandlers() {
        this.attachEventHandler('user-name', 'input', this.onUserNameChange);
        this.attachEventHandler('review-text', 'input', this.onReviewTextChange);
        this.attachEventHandler('cancel-btn', 'click', this.hideEditor);
        this.attachEventHandler('file', 'change', this.onAvatarFileSelected);
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

    onReviewTextChange(e) {
        this.reviewTextContainer.innerHTML = e.target.value;
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
}