const child_process = require('child_process');
const readline = require('readline');
const {sendMsg, getServer} = require('../socket');

const DIRB = {
    complete: true,
    data: ''
};

/**
 * @param {string} domain e.g. https://akawebdesign.com
 */
function dirb(domain) {
    // reset the status
    DIRB.complete = false;

    const shell = child_process.spawn('dirb', [domain]);

    readline.createInterface({
        input     : shell.stdout,
        terminal  : false
    }).on('line', function(line) {
        DIRB.data += `${line}\n`;
        sendMsg('dirb', JSON.stringify(DIRB));
    });

    shell.stderr.on('data', (data) => {
        DIRB.data += `${data.toString()}\n`;
        sendMsg('dirb', JSON.stringify(DIRB));
    });

    shell.on('close', (code) => {
        DIRB.complete = true;
        sendMsg('dirb', JSON.stringify(DIRB));
    });

    shell.on('error', (err) => {
        console.log(`DIRB error code: ${err.code}`);
        console.log(`DIRB error message: ${error.message}`);
        DIRB.data += `${err.message}\n`;

        sendMsg('dirb', JSON.stringify(DIRB));
    });
}

/**
 *
 * @param domain
 */
function init(domain) {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('dirb', JSON.stringify(DIRB));
    });

    dirb(domain);
}

module.exports = {
    init
};