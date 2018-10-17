const child_process = require('child_process');

/**
 * @param {string} domain e.g. akawebdesign.com
 * @param {function} callback
 */
function nslookup(domain, callback) {
    child_process.exec(`nslookup ${domain}`, callback);
}

module.exports = {
    nslookup
}