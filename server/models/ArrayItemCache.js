const {CacheItem} = require('./CacheItem');
const {ArrayItem} = require('./ArrayItem');

class ArrayItemCache {
    constructor() {
        this.cache = new Map();
    }

    /**
     *
     * @param newData
     * @param url
     */
    merge(newData = {}, url = '') {
        for (let prop in newData) {
            if (!this.cache.has(prop)) {
                this.cache.set(prop, new CacheItem());
            }

            let cacheItem = this.cache.get(prop);
            cacheItem.addValue(newData[prop], url);
        }
    }

    serialize() {
        const results = [];

        this.cache.forEach((cacheItem, name) => {
            results.push(
                new ArrayItem({
                    name,
                    values: cacheItem.serialize()
                })
            )
        });

        return results;
    }
}

module.exports = {
    ArrayItemCache
};