const {sendMsg, getServer} = require('../socket');
const {ArrayItemCache} = require('../models/ArrayItemCache');

const HEADERS = new ArrayItemCache();

function addHeaders(headers, url) {
    HEADERS.merge(headers, url);

    sendMsg('headers', JSON.stringify(
        HEADERS.serialize()
    ));
}

/**
 *
 */
function init() {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('headers', JSON.stringify(HEADERS.serialize()));
    });
}


module.exports = {
    init,
    addHeaders
};