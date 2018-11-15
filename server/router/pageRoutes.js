const path = require('path'),
    express = require('express'),
    URI = require('urijs');

const {crawl} = require('../crawler');

const router = express.Router(),
    root = path.resolve(__dirname, '..', '..');

router.get('/', (req, res) => {
    res.sendFile(path.resolve(root, 'dist', 'index.html'));
});

router.post('/api/crawl', (req, res) => {
    const input = req.body.domain;

    const maxDepth = parseInt(req.body.maxDepth);
    const obey = false;

    const url = new URI(input);

    // protect input by validating the URL provided to the API
    if (url.domain() !== '') {
        console.log(`Preparing to crawl ${url.origin()}`);
        console.log(`Max depth: ${maxDepth}`);
        console.log(`Respect robots.txt? ${obey ? 'true' : 'false'}`);

        crawl({
            url: url.origin(),
            domain: url.domain(),
            hostname: url.hostname(),
            maxDepth,
            obey
        });
    }

    res.send('');
});

module.exports = router;