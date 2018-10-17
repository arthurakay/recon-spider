const HCCrawler = require('headless-chrome-crawler');

const URL = require('./url');
const {getExtractors} = require('./scripts/retire');
const {parseTree} = require('./scripts/sitemap');
const {nslookup} = require('./scripts/nslookup');

const {sendMsg} = require('./socket');
const {ArrayItemCache} = require('./models/ArrayItemCache');

const META_TAGS = new ArrayItemCache();
const HEADERS = new ArrayItemCache();
const RETIRE_JS = new ArrayItemCache();

/*
 * Run the program
 */
function launch() {
    return HCCrawler.launch({
        /**
         * Function that runs in the context of the browser window
         */
        evaluatePage: async () => {
            const extractors = await window.__exposedFunction();

            /* Utility functions */
            function detectJS() {
                const retireJs = {};

                for (let component in extractors) {
                    const results = [];
                    const funcs = extractors[component];

                    if (funcs) {
                        for (let i = 0; i < funcs.length; i++) {
                            try {
                                const result = eval(funcs[i]);
                                results.push(result);
                            } catch (e) {
                                // do nothing
                            }
                        }

                        // only report JS libs that are identified
                        if (results.length > 0) {
                            retireJs[component] = results;
                        }
                    }
                }

                return retireJs;
            }

            function assembleMetaInfo(values, tags) {
                for (let i = 0; i < tags.length; i++) {
                    const tag = tags[i];
                    let name = tag.name || tag['http-equiv'];

                    if (name) {
                        if (!values[name]) {
                            values[name] = [];
                        }
                        values[name].push(tag.content);
                    } else if (tag.attributes.charset) {
                        name = 'charset';

                        if (!values[name]) {
                            values[name] = [];
                        }
                        values[name].push(tag.attributes.charset.value);
                    }
                }

                /**
                 * {
                 *     'metaTagName': [...values...]
                 * }
                 */
                return values;
            }

            function getMetaTags() {
                const meta = {};

                // look in the HTML <head> first
                let tags = document.head.querySelectorAll('meta');
                assembleMetaInfo(meta, tags);

                // then look in the HTML <body>
                tags = document.querySelectorAll('meta');
                assembleMetaInfo(meta, tags);

                return meta;
            }

            /* Define the return values */
            let returnData = {};
            let error = false;

            try {
                returnData = {
                    retireJs: detectJS(),
                    vulnerabilities: null,
                    metaTags: getMetaTags()
                };
            } catch (e) {
                error = true;
            }

            return {
                error: error,
                data: returnData
            };
        },

        /**
         * Expose a function to the window object; runs in the context of Node.js
         */
        exposedFunctionName: '__exposedFunction',
        exposeFunction: () => getExtractors(),

        /**
         * Do some stuff after evaluatePage() returns (in Node.js context)
         * @param {object} result The data returned by evaluatePage()
         *
         *      {
         *          error: {boolean}
         *          data: {
         *              retireJs: {},
         *              vulnerabilities: null,
         *              metaTags: {}
         *          }
         *      }
         */
        onSuccess: result => {
            const url = result.options.url;
            URL.addUrl(url);
            HEADERS.merge(result.response.headers, url);

            const resultData = result.result;

            if (!resultData.error) {
                META_TAGS.merge(resultData.data.metaTags, url);
                RETIRE_JS.merge(resultData.data.retireJs, url);
            }
        }
    });
}

/**
 *
 * @param domain
 * @param maxDepth
 * @param obey
 * @param hostname
 * @return {Promise<void>}
 */
async function crawl({domain, maxDepth, obey, hostname}) {
    nslookup(hostname, (error, stdOut, stdErr) => {
        if (error) {
            sendMsg('nslookup', JSON.stringify({ data: 'An error occurred.'}));
        } else {
            sendMsg('nslookup', JSON.stringify({ data: stdOut }));
        }
    });

    // Launch the crawler with persisting cache
    const crawler = await launch();

    await crawler.queue({
        skipDuplicates: true,
        url: domain,
        maxDepth: maxDepth,
        obeyRobotsTxt: obey,
        allowedDomains: [hostname]
    });

    await crawler.onIdle();
    await crawler.close(); // Close the crawler but cache won't be cleared

    sendMsg('sitemap', JSON.stringify(
        parseTree(domain, URL.getUrls())
    ));

    sendMsg('headers', JSON.stringify(
        HEADERS.serialize()
    ));

    sendMsg('metaTags', JSON.stringify(
        META_TAGS.serialize()
    ));

    sendMsg('retireJs', JSON.stringify(
        RETIRE_JS.serialize()
    ));

    sendMsg('crawler', 'CRAWL COMPLETE');
}

module.exports = {
    crawl
};