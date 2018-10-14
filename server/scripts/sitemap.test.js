const {parseTree} = require('./sitemap');

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

const tree = '{"key":"https://www.foobar.com","title":"/","children":[{"key":"https://www.foobar.com/about","title":"about","children":[{"key":"https://www.foobar.com/about/partners","title":"partners","children":[]}]},{"key":"https://www.foobar.com/careers","title":"careers","children":[{"key":"https://www.foobar.com/careers/openings","title":"openings","children":[]}]},{"key":"https://www.foobar.com/contact","title":"contact","children":[]},{"key":"https://www.foobar.com/newsroom","title":"newsroom","children":[]},{"key":"https://www.foobar.com/products","title":"products","children":[]},{"key":"https://www.foobar.com/request-demo","title":"request-demo","children":[]},{"key":"https://www.foobar.com/services","title":"services","children":[{"key":"https://www.foobar.com/services/assessments","title":"assessments","children":[]},{"key":"https://www.foobar.com/services/training","title":"training","children":[]}]},{"key":"https://www.foobar.com/sitemap","title":"sitemap","children":[]},{"key":"https://www.foobar.com/terms-of-service","title":"terms-of-service","children":[]}]}';

test('sitemap > parseTree()', () => {
    const results = parseTree('https://www.foobar.com', urls);

    expect(JSON.stringify(results)).toBe(tree);
});