const child_process = require('child_process');
const {sendMsg, getServer} = require('../socket');

const NS_LOOKUP = {data: 'No data.'};

/**
 * @param {string} domain e.g. akawebdesign.com
 */
function nslookup(domain) {
    child_process.exec(`nslookup ${domain}`, (error, stdOut, stdErr) => {
        if (error) {
            NS_LOOKUP.data = 'An error occurred.';
        } else {
            NS_LOOKUP.data = stdOut;
        }

        sendMsg('nslookup', JSON.stringify(NS_LOOKUP));
    });
}

/**
 *
 * @param domain
 */
function init(domain) {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('nslookup', JSON.stringify(NS_LOOKUP));
    });

    nslookup(domain);
}

module.exports = {
    init
};