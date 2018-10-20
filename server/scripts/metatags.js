const {sendMsg, getServer} = require('../socket');
const {ArrayItemCache} = require('../models/ArrayItemCache');

const META_TAGS = new ArrayItemCache();

function addTags(metaTags, url) {
    META_TAGS.merge(metaTags, url);

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