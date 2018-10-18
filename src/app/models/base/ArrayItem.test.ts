import ArrayItem from './ArrayItem';

const data = {
    name: "charset",
    values: {
        'utf-8': ['foo.html', 'bar.html']
    }
};

test('ArrayItem', () => {
    const arrayItem = new ArrayItem(data);

    const expectedOutput = {
        name: "charset",
        values: [{
            name: 'utf-8',
            pages: ['foo.html', 'bar.html']
        }]
    };

    expect(JSON.stringify(arrayItem))
        .toBe(JSON.stringify(expectedOutput));
});