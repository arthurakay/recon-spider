const {CacheItem} = require('./CacheItem');
const {ArrayItem} = require('./ArrayItem');

class ArrayItemCache {
    constructor() {
        this.cache = new Map();
    }

    /**
     * @param newData {object} Data in the form:
     *     {
     *         'js-lib': [{name: '1.1.1', info: []}]
     *     }
     *
     * @param url {string} The page on which the data was found
     */
    merge(newData = {}, url = '') {
        for (let prop in newData) {
            if (!this.cache.has(prop)) {
                this.cache.set(prop, new CacheItem());
            }

            let cacheItem = this.cache.get(prop);
            cacheItem.addValues(newData[prop], url);
        }
    }

    /**
     *
     * @return {Array}
     *     [
     *         {
     *             name: 'js-lib',
     *             values: {
     *                 '1.1.1': ['foo.html']
     *             }
     *         },
     *         {
     *             name: 'meta-tag',
     *             values: {
     *                 'utf-8': ['bar.html', 'foo.html']
     *             }
     *         }
     *     ]
     */
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