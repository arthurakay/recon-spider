const {ValueItem} = require('./ValueItem');

test('ValueItem', () => {
    const defaultData = {
        pages: [],
        info: []
    };

    const item = new ValueItem();

    expect(JSON.stringify(item.serialize())).toBe(JSON.stringify(defaultData));

    item.setData('foo.html');

    const updatedData = {
        pages: ['foo.html'],
        info: []
    };
    expect(JSON.stringify(item.serialize())).toBe(JSON.stringify(updatedData));
});