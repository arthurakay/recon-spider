const child_process = require('child_process');
const {sendMsg, getServer} = require('../socket');

const DIRB = {data: 'No data.'};

/**
 * @param {string} domain e.g. https://akawebdesign.com
 */
function dirb(domain) {
    child_process.exec(`dirb ${domain}`, (error, stdOut, stdErr) => {
        if (error) {
            console.log(`DIRB error code: ${error.code}`);
            console.log(`DIRB stdout: ${stdOut}`);

            DIRB.data = 'An error occurred.';
        } else {
            DIRB.data = stdOut;
        }

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