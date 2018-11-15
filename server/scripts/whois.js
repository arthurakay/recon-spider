const child_process = require('child_process');
const readline = require('readline');
const {sendMsg, getServer} = require('../socket');

const WHOIS = {data: ''};

/**
 * @param {string} hostname e.g. akawebdesign.com
 */
function whois(hostname) {
    const shell = child_process.spawn('whois', [hostname]);

    readline.createInterface({
        input     : shell.stdout,
        terminal  : false
    }).on('line', function(line) {
        WHOIS.data += `${line}\n`;
        sendMsg('whois', JSON.stringify(WHOIS));
    });

    shell.stderr.on('data', (data) => {
        WHOIS.data += `${data.toString()}\n`;
        sendMsg('whois', JSON.stringify(WHOIS));
    });

    shell.on('close', (code) => {
        sendMsg('whois', JSON.stringify(WHOIS));
    });

    shell.on('error', (err) => {
        console.log(`WHOIS error code: ${err.code}`);
        console.log(`WHOIS error message: ${error.message}`);
        WHOIS.data += `${err.message}\n`;

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