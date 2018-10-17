const request = require('request');

class JsLib {
    constructor({name = '', values = []}) {
        this.name = name;
        this.values = values;
    }
}


const JS = new Map();

/**
 * Add new parameters to our Map
 * @param newJS {Object}
 */
function mergeJS(newJS) {
    for (let jsLib in newJS) {
        const results = newJS[jsLib];

        if (results.length > 0) {
            if (!JS.has(jsLib)) {
                JS.set(jsLib, new Set());
            }

            let jsSet = JS.get(jsLib);

            for (let i=0; i<results.length; i++) {
                jsSet.add(results[i]);
            }
        }
    }
}

/**
 * Convert the Map() of headers into an array for client consumption
 * @return {Array}
 */
function serializeJs() {
    const results = [];

    JS.forEach((valueSet, name) => {
        results.push(
            new JsLib({
                name,
                values: Array.from(valueSet)
            })
        )
    });

    return results;
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
    mergeJS,
    serializeJs
};