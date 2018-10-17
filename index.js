const program = require('commander');
const HCCrawler = require('headless-chrome-crawler');
const retireJs = require('retire');
const URI = require('urijs');
const request = require('request');

const headers = require('./server/scripts/headers');
const meta = require('./server/scripts/meta');
const url = require('./server/url');

/*
 * Commander setup
 */
program
    .option('--url <url>', 'Domain to crawl (e.g. https://www.google.com)')
    .option('--maxDepth [depth]', 'Maximum depth for the crawler to follow links automatically (defaults to 2)', 2)
    .option('--obey', 'Obey robots.txt (defaults to false)')
    .parse(process.argv);

const hostname = new URI(program.url).hostname();

console.log(`Preparing to crawl ${program.url} (${hostname})`);
console.log(`Max depth: ${program.maxDepth}`);
console.log(`Respect robots.txt? ${program.obey ? 'true' : 'false'}`);

/*
 * RetireJS shim (from https://github.com/RetireJS/retire.js/blob/master/chrome/js/background.js)
 */
// let retireJsRepo, vulnerableJs;
//
// function download(url) {
//     return new Promise((resolve, reject) => {
//         request(url, (error, response, body) => {
//             if (error) {
//                 console.warn("Got " + response.statusCode + " when trying to download " + url);
//                 reject(response);
//             }
//
//             resolve(body);
//         });
//     });
// }
//
// function downloadRetireJS() {
//     const repoUrl = "https://raw.githubusercontent.com/RetireJS/retire.js/master/repository/jsrepository.json";
//     const updatedAt = Date.now();
//     console.log("Downloading RetireJS repo ...");
//
//     return new Promise((resolve, reject) => {
//         download(repoUrl + "?" + updatedAt)
//             .then((repoData) => {
//             retireJsRepo = JSON.parse(repoData);
//             console.log("RetireJS loaded!");
//
//             vulnerableJs = {};
//             // setFuncs();
//             resolve();
//         });
//     });
// }
//
// function getFuncs() {
//     const retireJsFuncs = {};
//
//     for (let component in retireJsRepo) {
//         const results = [];
//         const funcs = retireJsRepo[component].extractors.func;
//
//         if (funcs) {
//             for (let i = 0; i < funcs.length; i++) {
//                 const result = (new Function(funcs[i]))();
//                 results.push(result);
//             }
//
//             retireJsFuncs[component] = results;
//         }
//     }
//
//     return retireJsFuncs;
// }
function downloadRetireJS() {
    return Promise.resolve();
}


/*
 * Run the program
 */
function launch() {
    return HCCrawler.launch({
        evaluatePage: meta.getMetaTags,
        onSuccess: result => {
            url.addUrl(result.options.url);
            headers.mergeHeaders(result.response.headers);
            meta.mergeMetaTags(result.result);


            // const results = retireJs.scanUri(result.options.url, retireJsRepo);
            // vulnerableJs = retireJs.isVulnerable(results);
            // console.log(result.result);
        }
    });
}

// download the repo first; then we can begin!
downloadRetireJS().then(async () => {
    // Launch the crawler with persisting cache
    const crawler = await launch();

    await crawler.queue({
        skipDuplicates: true,
        url: program.url,
        maxDepth: program.maxDepth,
        obeyRobotsTxt: program.obey,
        allowedDomains: [hostname]
    });

    await crawler.onIdle();
    await crawler.close(); // Close the crawler but cache won't be cleared

    console.log(JSON.stringify(headers.serializeHeaders()));
});