const path = require('path'),
    express = require('express'),
    URI = require('urijs');

const {crawl} = require('../scripts/crawler');

const router = express.Router(),
    root = path.resolve(__dirname, '..', '..');

router.get('/', (req, res) => {
    res.sendFile(path.resolve(root, 'dist', 'index.html'));
});

router.post('/api/crawl', (req, res) => {
    const domain = req.body.domain;
    const hostname = new URI(domain).hostname();
    const maxDepth = parseInt(req.body.maxDepth);
    const obey = false;

    console.log(`Preparing to crawl ${domain} (${hostname})`);
    console.log(`Max depth: ${maxDepth}`);
    console.log(`Respect robots.txt? ${obey ? 'true' : 'false'}`);

    crawl({domain, hostname, maxDepth, obey});

    res.send('check the console');
});

module.exports = router;