const HCCrawler = require('headless-chrome-crawler');

const RETIRE_JS = require('./scripts/retire');
const NSLOOKUP = require('./scripts/nslookup');
const WAPPALYZER = require('./scripts/wappalyzer');
const HEADERS = require('./scripts/headers');
const META_TAGS = require('./scripts/metatags');
const SITEMAP = require('./scripts/sitemap');

const {sendMsg} = require('./socket');

/**
 * Function that runs in the context of the browser window
 */
const evaluatePage = async () => {
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
};

/*
 * Run the program
 */
function launch() {
    return HCCrawler.launch({
        customCrawl: async (page, crawl) => {
            const result = await crawl();

            await page.exposeFunction('__exposedFunction', () => RETIRE_JS.getExtractors());
            result.result = await page.evaluate(evaluatePage);

            return result;
        },

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
            SITEMAP.addUrl(url);
            HEADERS.addHeaders(result.response.headers, url);

            const resultData = result.result;

            if (!resultData.error) {
                META_TAGS.addTags(resultData.data.metaTags, url);
                RETIRE_JS.addJs(resultData.data.retireJs, url);
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
    NSLOOKUP.init(hostname);
    WAPPALYZER.init(domain, maxDepth);
    HEADERS.init();
    META_TAGS.init();
    RETIRE_JS.init();
    SITEMAP.init(domain);

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

    sendMsg('crawler', 'CRAWL COMPLETE');
}

module.exports = {
    crawl
};