const META_TAGS = new Map();

class MetaTag {
    constructor({name = '', values = []}) {
        this.name = name;
        this.values = values;
    }
}

function mergeMetaTags(newTags) {
    for (let tagName in newTags) {
        if (!META_TAGS.has(tagName)) {
            META_TAGS.set(tagName, new Set());
        }

        let tag = META_TAGS.get(tagName);
        const newValues = newTags[tagName];

        for (let i = 0; i < newValues.length; i++) {
            tag.add(newValues[i]);
        }
    }
}

function serializeMetaTags() {
    const results = [];

    META_TAGS.forEach((valueSet, name) => {
        results.push(
            new MetaTag({
                name,
                values: Array.from(valueSet)
            })
        )
    });

    return results;
}

module.exports = {
    mergeMetaTags,
    serializeMetaTags
};