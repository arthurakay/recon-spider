const {ArrayItemCache} = require('./ArrayItemCache');

const js = {
    "jquery": ["3.3.1"]
};

const headers = {
    'Connection': 'keep-alive',
    'Content-Length': '0',
    'Content-Type': 'text/html; charset=utf-8',
    'Date': 'Wed, 17 Oct 2018 14:07:21 GMT',
    'ETag': 'W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"',
    'X-Powered-By': 'Express'
};

test('ArrayItemCache > merge() and serialize()', () => {
    const CACHE = new ArrayItemCache();

    const defaultData = CACHE.serialize();
    expect(JSON.stringify(defaultData)).toBe('[]');

    CACHE.merge(headers, 'foo.html');

    const updatedOutput = [
        {
            name: 'Connection',
            values: {
                'keep-alive': ['foo.html']
            }
        },
        {
            name: 'Content-Length',
            values: {
                '0': ['foo.html']
            }
        },
        {
            name: 'Content-Type',
            values: {
                'text/html; charset=utf-8': ['foo.html']
            }
        },
        {
            name: 'Date',
            values: {
                'Wed, 17 Oct 2018 14:07:21 GMT': ['foo.html']
            }
        },
        {
            name: 'ETag',
            values: {
                'W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"': ['foo.html']
            }
        },
        {
            name: 'X-Powered-By',
            values: {
                'Express': ['foo.html']
            }
        }
    ];
    const updatedData = CACHE.serialize();
    expect(JSON.stringify(updatedData)).toBe(JSON.stringify(updatedOutput));
});

test('ArrayItemCache > multiple pages', () => {
    const CACHE = new ArrayItemCache();

    const defaultData = CACHE.serialize();
    expect(JSON.stringify(defaultData)).toBe('[]');

    CACHE.merge(js, 'foo.html');
    CACHE.merge(js, 'bar.html');

    const updatedOutput = [{
        name: 'jquery',
        values: {
            '3.3.1': ['foo.html', 'bar.html']
        }
    }];
    const updatedData = CACHE.serialize();
    expect(JSON.stringify(updatedData)).toBe(JSON.stringify(updatedOutput));
});