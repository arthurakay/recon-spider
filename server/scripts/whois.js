const child_process = require('child_process');
const {sendMsg, getServer} = require('../socket');

const WHOIS = {data: 'No data.'};

/**
 * @param {string} hostname e.g. akawebdesign.com
 */
function whois(hostname) {
    child_process.exec(`whois ${hostname}`, (error, stdOut, stdErr) => {
        if (error) {
            console.log(`WHOIS error code: ${error.code}`);
            console.log(`WHOIS stdout: ${stdOut}`);

            WHOIS.data = 'An error occurred.';
        } else {
            WHOIS.data = stdOut;
        }

        sendMsg('whois', JSON.stringify(WHOIS));
    });
}

/**
 *
 * @param hostname
 */
function init(hostname) {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('whois', JSON.stringify(WHOIS));
    });

    whois(hostname);
}

module.exports = {
    init
};