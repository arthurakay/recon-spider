const {sendMsg, getServer} = require('../socket');
const {ArrayItemCache} = require('../models/ArrayItemCache');

const HEADERS = new ArrayItemCache();

/**
 * @param headers {object} HTTP headers in the form:
 *     {
 *         'Connection': 'keep-alive'
 *     }
 * @param url {string} The page on which the response headers were found
 */
function addHeaders(headers, url) {
    const newData = {};

    for (let header in headers) {
        const value = headers[header];
        newData[header] = [];

        newData[header].push({name: value, info: []});
    }

    HEADERS.merge(newData, url);

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