const program = require('commander');
const HCCrawler = require('headless-chrome-crawler');
const Wappalyzer = require('wappalyzer');

/*
 * Commander setup
 */
program
    .option('--url <url>', 'Domain to crawl (e.g. https://www.google.com)')
    .option('--maxDepth [depth]', 'Maximum depth for the crawler to follow links automatically (defaults to 2)', 2)
    .parse(process.argv);

console.log(`Preparing to crawl ${program.url}`);
console.log(`Max depth: ${program.maxDepth}`);

const options = {
    debug: false,
    delay: 500,
    maxDepth: program.maxDepth,
    maxUrls: 100,
    maxWait: 5000,
    recursive: true,
    htmlMaxCols: 2000,
    htmlMaxRows: 2000,
};

const wappalyzer = new Wappalyzer(program.url, options);

wappalyzer.analyze()
    .then(json => {
        console.log(JSON.stringify(json, null, 2));
    })
    .catch(error => {
        console.log(error);
    });