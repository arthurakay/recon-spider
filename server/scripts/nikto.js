const child_process = require('child_process');
const readline = require('readline');
const {sendMsg, getServer} = require('../socket');

const NIKTO = {
    complete: true,
    data: ''
};

/**
 * @param {string} domain e.g. https://akawebdesign.com
 */
function nikto(domain) {
    // reset the status
    NIKTO.complete = false;

    const shell = child_process.spawn('nikto', ['-h', domain, '-Tuning', 'x']);

    readline.createInterface({
        input     : shell.stdout,
        terminal  : false
    }).on('line', function(line) {
        NIKTO.data += `${line}\n`;
        sendMsg('nikto', JSON.stringify(NIKTO));
    });

    shell.stderr.on('data', (data) => {
        NIKTO.data += `STDERR: ${data.toString()}\n`;
        sendMsg('nikto', JSON.stringify(NIKTO));
    });

    shell.on('close', (code) => {
        NIKTO.complete = true;
        sendMsg('nikto', JSON.stringify(NIKTO));
    });

    shell.on('error', (err) => {
        console.log(`NIKTO error code: ${err.code}`);
        console.log(`NIKTO error message: ${error.message}`);
        NIKTO.data += `ERROR: ${err.message}\n`;

        sendMsg('nikto', JSON.stringify(NIKTO));
    });
}

/**
 *
 * @param domain
 */
function init(domain) {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('nikto', JSON.stringify(NIKTO));
    });

    nikto(domain);
}

module.exports = {
    init
};