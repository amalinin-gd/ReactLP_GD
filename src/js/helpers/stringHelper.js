export default class StringHelper {
    static getInstance() {
        if (!this.instance) {
            this.instance = new StringHelper();
        }

        return this.instance;
    }

    replaceSubstringAt(str, newSubstring, indexStart, indexEnd) {
        return str.substr(0, indexStart) + newSubstring + str.substr(indexEnd);
    }

    replaceTags(text, entries, formatTagName, htmlTagName, className) {
        let textWithReplacedTags = text;

        entries.forEach((formatTaggedString) => {
            let tagContent = formatTaggedString.replace(`[${formatTagName}]`, '').replace(`[/${formatTagName}]`, '');
            let htmlTaggedString = `<${htmlTagName} class="${className}">${tagContent}</${htmlTagName}>`;

            textWithReplacedTags = textWithReplacedTags.replace(formatTaggedString, htmlTaggedString);
        });

        return textWithReplacedTags;
    }
}