class ValueItem {
    constructor() {
        this.pages = new Set();
        this.info = [];
    }

    /**
     * @param url {string} The page on which the data was found
     * @param info {array} An array of information related to the data
     */
    setData(url, info = []) {
        this.pages.add(url);

        for (let i=0; i<info.length; i++) {
            // don't include duplicates
            if (this.info.find(item => JSON.stringify(item) === JSON.stringify(info[i])) === undefined) {
                this.info.push(info[i]);
            }
        }
    }

    /**
     *     {
     *         pages: [],
     *         info: []
     *     }
     */
    serialize() {
        return {
            pages: Array.from(this.pages),
            info: this.info
        };
    }
}

module.exports = {
    ValueItem
};