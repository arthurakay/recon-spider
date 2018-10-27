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
 *
 * @param js {object} An object with the form:
 *     {
 *         'js-lib': ['1.1.1']
 *     }
 * @param url
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
 *
 * @param uris {array} Array of strings containing identified <script src="" />
 * @param page {string}
 */
function scanScripts(uris = [], page) {
    for (let i=0; i<uris.length; i++) {
        RetireJS.scanUri(uris[i], getRetireJS());

        const url = new URI(uris[i]);
        RetireJS.scanFileName(url.filename(), getRetireJS());

        request(uris[i], (error, response, body) => {
            if (error) {
                console.warn(
                    `Got ${response.statusCode} when trying to download ${uris[i]}`
                );
            } else {
                console.log(`scanFileContent(): ${uris[i]}`);
                const results = RetireJS.scanFileContent(body, getRetireJS(), hash)
            }
        });
    }

    // RETIRE_JS.merge(js, url);
    //
    // sendMsg('retireJs', JSON.stringify(
    //     RETIRE_JS.serialize()
    // ));
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
            retireJsRepo = JSON.parse(repoData);
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