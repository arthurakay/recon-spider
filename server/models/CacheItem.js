const {ValueItem} = require('./ValueItem');

class CacheItem {
    constructor() {
        this.values = new Map();
    }

    /**
     *
     * @param values {array} An array of values in form
     *     [
     *         {
     *             name: 'foo',
     *             info: [...]
     *         }
     *     ]
     * @param url {string} The page on which the value was found
     */
    addValues(values, url) {
        for (let i=0; i<values.length; i++) {
            const v = values[i];
            const key = v.name;

            if (!this.values.has(key)) {
                this.values.set(key, new ValueItem());
            }

            let item = this.values.get(key);
            item.setData(url, v.info);
        }
    }

    /**
     *     {
     *         'utf-8': {
     *             pages: ['bar.html', 'foo.html'],
     *             info: []
     *         }
     *     }
     */
    serialize() {
        const obj = {};

        this.values.forEach((valueItem, key) => {
            obj[key] = valueItem.serialize();
        });

        return obj;
    }
}

module.exports = {
    CacheItem
};