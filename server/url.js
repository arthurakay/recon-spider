const URL = new Set();

function addUrl(url) {
    if (URL.has(url)) {
        console.log(`Already crawled: ${url}`);
        return false;
    }

    URL.add(url);
    console.log(`Requested ${url}`);
}

function getUrls() {
    return Array.from(URL);
}

module.exports = {
    addUrl,
    getUrls
};