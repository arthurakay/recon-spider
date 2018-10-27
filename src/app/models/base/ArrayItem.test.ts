import ArrayItem from './ArrayItem';

const emptyArray: Array<any> = [];

const data = {
    name: "charset",
    values: {
        'utf-8': {
            pages: ['foo.html', 'bar.html'],
            info: emptyArray
        }
    }
};

test('ArrayItem', () => {
    const arrayItem = new ArrayItem(data);

    const expectedOutput = {
        name: "charset",
        values: [{
            name: 'utf-8',
            pages: ['foo.html', 'bar.html'],
            info: emptyArray
        }]
    };

    expect(JSON.stringify(arrayItem))
        .toBe(JSON.stringify(expectedOutput));
});