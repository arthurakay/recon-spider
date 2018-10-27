import BaseArrayStore from './BaseArrayStore';
import ArrayItem from '../../models/base/ArrayItem';

const emptyArray: Array<any> = [];

const data = [{
    name: "charset",
    values: {
        'utf-8': {
            pages: ['foo.html', 'bar.html'],
            info: emptyArray
        }
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
            pages: ['foo.html', 'bar.html'],
            info: emptyArray
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
            pages: ['foo.html'],
            info: emptyArray
        }]
    }];

    store.filterDataByUrl('foo.html');
    expect(JSON.stringify(store.data))
        .toBe(JSON.stringify(expectedResult_filtered));

    const expectedResult_not_filtered = [{
        name: "charset",
        values: [{
            name: 'utf-8',
            pages: ['foo.html', 'bar.html'],
            info: emptyArray
        }]
    }];

    store.filterDataByUrl();
    expect(JSON.stringify(store.data))
        .toBe(JSON.stringify(expectedResult_not_filtered));
});