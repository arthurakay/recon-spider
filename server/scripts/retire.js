const request = require('request');
const {sendMsg, getServer} = require('../socket');
const {ArrayItemCache} = require('../models/ArrayItemCache');

const RETIRE_JS = new ArrayItemCache();

function addJs(js, url) {
    RETIRE_JS.merge(js, url);

    sendMsg('retireJs', JSON.stringify(
        RETIRE_JS.serialize()
    ));
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

            setExtrators();
            vulnerableJs = {};
            resolve();
        });
    });
}

let extractors = {};
function setExtrators() {
    extractors = {};

    for (let component in retireJsRepo) {
        const results = [];
        const funcs = retireJsRepo[component].extractors.func;

        if (funcs) {
            for (let i = 0; i < funcs.length; i++) {
                results.push(funcs[i]);
            }

            extractors[component] = results;
        }
    }
}

function getExtractors() {
    return extractors;
}

function getRetireJS() {
    return retireJsRepo;
}

module.exports = {
    downloadRetireJS,
    getRetireJS,
    getExtractors,
    addJs,
    init
};