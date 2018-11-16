const HCCrawler = require('headless-chrome-crawler');

const RETIRE_JS = require('./scripts/retire');
const NSLOOKUP = require('./scripts/nslookup');
const WAPPALYZER = require('./scripts/wappalyzer');
const HEADERS = require('./scripts/headers');
const META_TAGS = require('./scripts/metatags');
const SITEMAP = require('./scripts/sitemap');
const WHOIS = require('./scripts/whois');
const DIRB = require('./scripts/dirb');
const NIKTO = require('./scripts/nikto');

const {sendMsg} = require('./socket');
const {fn} = require('./evaluatePage');


/*
 * Run the program
 */
function launch() {
    return HCCrawler.launch({
        args: ['--no-sandbox'],

        customCrawl: async (page, crawl) => {
            const result = await crawl();

            await page.exposeFunction('__exposedFunction', () => RETIRE_JS.getRetireJS());
            result.result = await page.evaluate(fn);

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
                RETIRE_JS.scanScripts(resultData.data.scripts, url);

            } else {
                console.log('error: \n');
                console.log(JSON.stringify(resultData.error));
            }
        }
    });
}

/**
 *
 * @param maxDepth {Integer}
 * @param obey {Boolean}
 * @param domain {String} www.akawebdesign.com
 * @param hostname {String} akawebdesign.com
 * @param url {String} https://www.akawebdesign.com
 * @return {Promise<void>}
 */
async function crawl({url, domain, hostname, maxDepth, obey}) {
    NSLOOKUP.init(hostname);
    WHOIS.init(domain);
    DIRB.init(url);
    NIKTO.init(url);
    WAPPALYZER.init(url, maxDepth);
    HEADERS.init();
    META_TAGS.init();
    RETIRE_JS.init();
    SITEMAP.init(url);

    // Launch the crawler with persisting cache
    const crawler = await launch();

    await crawler.queue({
        skipDuplicates: true,
        url: url,
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