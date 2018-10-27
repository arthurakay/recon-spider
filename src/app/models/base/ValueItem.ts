interface ValueItemConfig {
    name: string;
    pages: Array<string>;
    info: Array<any>;
}

export default class ValueItem {
    public name: string;
    public pages: Array<string>;
    public info: Array<any>;

    constructor(config: ValueItemConfig) {
        this.name = config.name;
        this.pages = config.pages || [];
        this.info = config.info || [];
    }

    hasPage(url: string) {
        return this.pages.indexOf(url) >= 0;
    }
}