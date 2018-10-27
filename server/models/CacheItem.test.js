const {CacheItem} = require('./CacheItem');

test('CacheItem', () => {
    const item = new CacheItem();

    expect(JSON.stringify(item.serialize())).toBe('{}');

    item.addValues(
        [{name: 'utf-8', info: []}],
        'foo.html'
    );

    const updatedData = {
        'utf-8': {
            pages: ['foo.html'],
            info: []
        }
    };
    expect(JSON.stringify(item.serialize())).toBe(JSON.stringify(updatedData));

    item.addValues(
        [{name: 'blah', info: []}],
        'bar.html'
    );

    const updatedDataAgain = {
        'utf-8': {
            pages: ['foo.html'],
            info: []
        },
        'blah': {
            pages: ['bar.html'],
            info: []
        }
    };
    expect(JSON.stringify(item.serialize())).toBe(JSON.stringify(updatedDataAgain));
});