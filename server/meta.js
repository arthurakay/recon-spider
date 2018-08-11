const META_TAGS = new Map();

function getMetaTags() {
    const meta = {};

    const tags = document.getElementsByTagName('meta');

    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const name = tag.name || tag['http-equiv'];

        if (name) {
            if (!meta[name]) {
                meta[name] = [];
            }
            meta[name].push(tag.content);
        }
    }

    return meta;
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
    const json = {};

    META_TAGS.forEach((valueSet, key) => {
        json[key] = Array.from(valueSet);
    });

    return json;
}

module.exports = {
    getMetaTags,
    mergeMetaTags,
    serializeMetaTags
};