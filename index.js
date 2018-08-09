const program = require('commander');
const HCCrawler = require('headless-chrome-crawler');
const BaseCache = require('headless-chrome-crawler/cache/base');

/*
 * Commander setup
 */
program
    .option('--url <url>', 'Domain to crawl (e.g. https://www.google.com)')
    .option('--maxDepth [depth]', 'Maximum depth for the crawler to follow links automatically (defaults to 2)', 2)
    .option('--obey', 'Obey robots.txt (defaults to false)')
    .parse(process.argv);

console.log(`Preparing to crawl ${program.url}`);
console.log(`Max depth: ${program.maxDepth}`);
console.log(`Respect robots.txt? ${program.obey ? 'true' : 'false'}`);

const protocolRegEx = /https:\/\//ig;
const domain = protocolRegEx.test(program.url) ? program.url.replace('https://', '') : program.url.replace('http://', '');

/*
 * Run the program
 */
function launch() {
    return HCCrawler.launch({
        onSuccess: result => {
            console.log(`Requested ${result.options.url}`);
        }
    });
}

(async () => {
    // Launch the crawler with persisting cache
    const crawler = await launch();

    await crawler.queue({
        skipDuplicates: true,
        url: program.url,
        maxDepth: program.maxDepth,
        obeyRobotsTxt: program.obey,
        allowedDomains: [domain]
    });

    await crawler.onIdle();
    await crawler.close(); // Close the crawler but cache won't be cleared
})();