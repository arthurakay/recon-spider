const child_process = require('child_process');
const {sendMsg, getServer} = require('../socket');

const NS_LOOKUP = {data: 'No data.'};

/**
 * @param {string} hostname e.g. akawebdesign.com
 */
function nslookup(hostname) {
    child_process.exec(`nslookup ${hostname}`, (error, stdOut, stdErr) => {
        if (error) {
            console.log(`NSLOOKUP error code: ${error.code}`);
            console.log(`NSLOOKUP stdout: ${stdOut}`);

            NS_LOOKUP.data = 'An error occurred.';
        } else {
            NS_LOOKUP.data = stdOut;
        }

        sendMsg('nslookup', JSON.stringify(NS_LOOKUP));
    });
}

/**
 *
 * @param hostname
 */
function init(hostname) {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('nslookup', JSON.stringify(NS_LOOKUP));
    });

    nslookup(hostname);
}

module.exports = {
    init
};