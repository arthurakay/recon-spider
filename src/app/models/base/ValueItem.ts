interface ValueItemConfig {
    name: string;
    pages: Array<string>;
}

export default class ValueItem {
    public name: string;
    public pages: Array<string>;

    constructor(config: ValueItemConfig) {
        this.name = config.name;
        this.pages = config.pages;
    }

    hasPage(url: string) {
        return this.pages.indexOf(url) >= 0;
    }
}