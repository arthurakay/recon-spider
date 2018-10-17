const URL = new Set();

function addUrl(url) {
    if (URL.has(url)) {
        console.log(`Already crawled: ${url}`);
        return false;
    }

    console.log(`Requested ${url}`);
    URL.add(url);
}

function getUrls() {
    return Array.from(URL);
}

module.exports = {
    addUrl,
    getUrls
};