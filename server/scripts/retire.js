const crypto = require('crypto')
const request = require('request');
const RetireJS = require('retire');
const URI = require('urijs');

const {sendMsg, getServer} = require('../socket');
const {ArrayItemCache} = require('../models/ArrayItemCache');

const RETIRE_JS = new ArrayItemCache();

var hash = {
    'sha1' : function(data) {
        shasum   = crypto.createHash('sha1');
        shasum.update(data);
        return shasum.digest('hex');
    }
};

/**
 * Add results parsed by evaluatePage() to our cache after checking them against RetireJS
 * @param js {object} An object with the form:
 *     {
 *         'js-lib': ['1.1.1']
 *     }
 * @param url {string}
 */
function addJs(js, url) {
    const newData = {};

    for (let lib in js) {
        const values = js[lib];
        newData[lib] = [];

        for (let i=0; i<values.length; i++) {
            /*
                [{
                    component: 'jquery',
                    version: '1.12.4',
                    vulnerabilities: [ [Object], [Object] ]
                }]
             */
            const results = RetireJS.check(lib, values[i], getRetireJS());

            if (results.length > 0) {
                // TODO: would there ever be more than one match?
                newData[lib].push({name: values[i], info: results[0].vulnerabilities});
            }
        }
    }

    RETIRE_JS.merge(newData, url);

    sendMsg('retireJs', JSON.stringify(
        RETIRE_JS.serialize()
    ));
}

/**
 * Add results parsed by RetireJS into our cache
 * @param results {array} An array in form:
 *
 *     [{
           "version":"3.3.7",
           "component":"bootstrap",
           "detection":"filecontent",
           "vulnerabilities":[
               {"info":["https://github.com/twbs/bootstrap/issues/20184"],"below":"4.1.2","severity":"medium","identifiers":{"issue":"20184","summary":"XSS in data-target property of scrollspy","CVE":["CVE-2018-14041"]}},
               {"info":["https://github.com/twbs/bootstrap/issues/20184"],"below":"4.1.2","severity":"medium","identifiers":{"issue":"20184","summary":"XSS in collapse data-parent attribute","CVE":["CVE-2018-14040"]}},
               {"info":["https://github.com/twbs/bootstrap/issues/20184"],"below":"4.1.2","severity":"medium","identifiers":{"issue":"20184","summary":"XSS in data-container property of tooltip","CVE":["CVE-2018-14042"]}}
           ]
 *     }]
 *
 * @param url {string}
 */
function addScannedJs(results, url) {
    const newData = {};

    for (let i=0; i<results.length; i++) {
        const result = results[i];
        const lib = result.component;

        newData[lib] = [];
        newData[lib].push({
            name: result.version,
            info: result.vulnerabilities
        });
    }

    RETIRE_JS.merge(newData, url);

    sendMsg('retireJs', JSON.stringify(
        RETIRE_JS.serialize()
    ));
}

/**
 * @param uris {array} Array of strings containing identified <script src="" />
 * @param page {string}
 */
function scanScripts(uris = [], page) {
    for (let i=0; i<uris.length; i++) {
        const scriptUrl = uris[i];

        const scanUri_results = RetireJS.scanUri(scriptUrl, getRetireJS());
        addScannedJs(scanUri_results, scriptUrl);

        const url = new URI(scriptUrl);
        const scanFileName_results = RetireJS.scanFileName(url.filename(), getRetireJS());
        addScannedJs(scanFileName_results, scriptUrl);

        request(scriptUrl, (error, response, body) => {
            if (error) {
                console.warn(
                    `Got ${response.statusCode} when trying to download ${scriptUrl}`
                );
            } else {
                const scanFileContent_results = RetireJS.scanFileContent(body, getRetireJS(), hash);
                addScannedJs(scanFileContent_results, scriptUrl);
            }
        });
    }
}

/**
 *
 */
function init() {
    const ioServer = getServer();

    ioServer.on('connection', () => {
        sendMsg('retireJs', JSON.stringify(RETIRE_JS.serialize()));
    });
}

/*
 * RetireJS shim (from https://github.com/RetireJS/retire.js/blob/master/chrome/js/background.js)
 */
let retireJsRepo, vulnerableJs;

function download(url) {
    return new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                console.warn("Got " + response.statusCode + " when trying to download " + url);
                reject(response);
            }

            resolve(body);
        });
    });
}

function downloadRetireJS() {
    const repoUrl = "https://raw.githubusercontent.com/RetireJS/retire.js/master/repository/jsrepository.json";
    const updatedAt = Date.now();
    console.log("Downloading RetireJS repo ...");

    return new Promise((resolve, reject) => {
        download(repoUrl + "?" + updatedAt)
            .then((repoData) => {
            retireJsRepo = JSON.parse(RetireJS.replaceVersion(repoData));
            console.log("RetireJS loaded!");

            vulnerableJs = {};
            resolve();
        });
    });
}

function getRetireJS() {
    return retireJsRepo;
}

module.exports = {
    downloadRetireJS,
    getRetireJS,
    addJs,
    scanScripts,
    init
};