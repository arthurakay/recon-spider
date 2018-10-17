class ValueItem {
    constructor() {
        this.pages = new Set();
    }
}

class CacheItem {
    constructor() {
        this.values = new Map();
    }

    addValue(value, url) {
        let newValues = [];

        // is value an array or a string?
        if (!Array.isArray(value)) {
            newValues.push(value);
        } else {
            newValues = value;
        }

        for (let i=0; i<newValues.length; i++) {
            const v = newValues[i];

            if (!this.values.has(v)) {
                this.values.set(v, new ValueItem());
            }

            let item = this.values.get(v);
            item.pages.add(url);
        }
    }

    serialize() {
        const obj = {};

        this.values.forEach((valueItem, key) => {
            obj[key] = Array.from(valueItem.pages)
        });

        return obj;
    }
}

module.exports = {
    CacheItem
};