const HCCrawler = require('headless-chrome-crawler');

const headers = require('../headers');
const meta = require('../meta');
const url = require('../url');
const {getExtractors} = require('../scripts/retire');
const {parseTree} = require('../scripts/sitemap');

const {sendMsg} = require('../socket');

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

                        retireJs[component] = results;
                    }
                }

                return retireJs;
            }

            function getMetaTags() {
                const meta = {};

                const tags = document.getElementsByTagName('meta');

                for (let i = 0; i < tags.length; i++) {
                    const tag = tags[i];
                    const name = tag.name || tag['http-equiv'];

                    if (name) {
                        if (!meta[name]) {
                            meta[name] = [];
                        }
                        meta[name].push(tag.content);
                    }
                }

                return meta;
            }

            /* Define the return values */
            let returnData = {};
            let error = false;

            try {
                returnData = {
                    js: detectJS(),
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
         */
        onSuccess: result => {
            url.addUrl(result.options.url);
            headers.mergeHeaders(result.response.headers);

            const resultData = result.result;

            if (!resultData.error) {
                meta.mergeMetaTags(resultData.meta);
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

    console.log('Emitting socket response "api"...');

    sendMsg('sitemap', JSON.stringify(
        parseTree(domain, url.getUrls()))
    );

    sendMsg('api', JSON.stringify({
        headers: headers.serializeHeaders(),
        // url: url.getUrls(),
        metaTags: meta.serializeMetaTags()
    }));
}

module.exports = {
    crawl
};