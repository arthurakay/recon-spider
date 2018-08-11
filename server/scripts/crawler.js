const HCCrawler = require('headless-chrome-crawler');

const headers = require('../headers');
const meta = require('../meta');
const url = require('../url');

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

    console.log(JSON.stringify(headers.serializeHeaders()));
}

module.exports = {
    crawl
};