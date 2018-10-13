const {parseTree} = require('../../../server/scripts/sitemap');

const urls = [
    'https://www.foobar.com/',
    'https://www.foobar.com/about/partners',
    'https://www.foobar.com/about/mission',
    'https://www.foobar.com/careers/openings',
    'https://www.foobar.com/contact',
    'https://www.foobar.com/products',
    'https://www.foobar.com/services/assessments',
    'https://www.foobar.com/services/training',
    'https://www.foobar.com/request-demo',
    'https://www.foobar.com/services',
    'https://www.foobar.com/careers',
    'https://www.foobar.com/newsroom',
    'https://www.foobar.com/terms-of-service',
    'https://www.foobar.com/sitemap'
];

console.log(parseTree('https://www.foobar.com', urls));