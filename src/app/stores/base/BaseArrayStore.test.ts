import BaseArrayStore from './BaseArrayStore';
import ArrayItem from '../../models/base/ArrayItem';

const data = [{
    name: "charset",
    values: {
        'utf-8': ['foo.html', 'bar.html']
    }
}];

test('BaseArrayStore > setData()', () => {
    const store = new BaseArrayStore({
        model: ArrayItem
    });

    expect(JSON.stringify(store.data))
        .toBe('[]');

    store.setData(data);

    const expectedResult = [{
        name: "charset",
        values: [{
            name: 'utf-8',
            pages: ['foo.html', 'bar.html']
        }]
    }];

    expect(JSON.stringify(store.data))
        .toBe(JSON.stringify(expectedResult));
});

test('BaseArrayStore > filterDataByUrl()', () => {
    const store = new BaseArrayStore({
        model: ArrayItem
    });

    expect(JSON.stringify(store.data))
        .toBe('[]');

    store.setData(data);

    const expectedResult_filtered = [{
        name: "charset",
        values: [{
            name: 'utf-8',
            pages: ['foo.html']
        }]
    }];

    store.filterDataByUrl('foo.html');
    expect(JSON.stringify(store.data))
        .toBe(JSON.stringify(expectedResult_filtered));

    const expectedResult_not_filtered = [{
        name: "charset",
        values: [{
            name: 'utf-8',
            pages: ['foo.html', 'bar.html']
        }]
    }];

    store.filterDataByUrl();
    expect(JSON.stringify(store.data))
        .toBe(JSON.stringify(expectedResult_not_filtered));
});