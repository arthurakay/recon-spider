const {sendMsg, getServer} = require('../socket');
const {ArrayItemCache} = require('../models/ArrayItemCache');

const META_TAGS = new ArrayItemCache();

/**
 * @param metaTags {object} HTTP headers in the form:
 *     {
 *         "charset": ["utf-8","utf-8"]
 *     }
 * @param url {string} The page on which the response headers were found
 */
function addTags(metaTags, url) {
    const newData = {};

    for (let tag in metaTags) {
        const values = metaTags[tag];
        newData[tag] = [];

        for (let i=0; i<values.length; i++) {
            newData[tag].push({name: values[i], info: []});
        }
    }

    META_TAGS.merge(newData, url);

    sendMsg('metaTags', JSON.stringify(
        META_TAGS.serialize()
    ));
}

/**
 *
 */
function init() {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('metaTags', JSON.stringify(META_TAGS.serialize()));
    });
}


module.exports = {
    init,
    addTags
};