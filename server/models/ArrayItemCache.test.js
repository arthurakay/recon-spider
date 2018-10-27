const {ArrayItemCache} = require('./ArrayItemCache');

const js = {
    "jquery": [{name: "3.3.1", info: []}]
};

const headers = {
    'Connection': [{name:'keep-alive', info:[]}],
    'Content-Length': [{name:'0', info:[]}],
    'Content-Type': [{name:'text/html; charset=utf-8', info:[]}],
    'Date': [{name:'Wed, 17 Oct 2018 14:07:21 GMT', info:[]}],
    'ETag': [{name:'W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"', info:[]}],
    'X-Powered-By': [{name:'Express', info:[]}]
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
                'keep-alive': {
                    pages: ['foo.html'],
                    info: []
                }
            }
        },
        {
            name: 'Content-Length',
            values: {
                '0': {
                    pages: ['foo.html'],
                    info: []
                }
            }
        },
        {
            name: 'Content-Type',
            values: {
                'text/html; charset=utf-8': {
                    pages: ['foo.html'],
                    info: []
                }
            }
        },
        {
            name: 'Date',
            values: {
                'Wed, 17 Oct 2018 14:07:21 GMT': {
                    pages: ['foo.html'],
                    info: []
                }
            }
        },
        {
            name: 'ETag',
            values: {
                'W/"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"': {
                    pages: ['foo.html'],
                    info: []
                }
            }
        },
        {
            name: 'X-Powered-By',
            values: {
                'Express': {
                    pages: ['foo.html'],
                    info: []
                }
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
            '3.3.1': {
                pages: ['foo.html', 'bar.html'],
                info: []
            }
        }
    }];
    const updatedData = CACHE.serialize();
    expect(JSON.stringify(updatedData)).toBe(JSON.stringify(updatedOutput));
});