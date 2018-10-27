import {action, computed, observable, toJS} from 'mobx';
import BaseStore from '../base/BaseStore';
import ArrayItem from '../../models/base/ArrayItem';
import ValueItem from '../../models/base/ValueItem';

export default class BaseArrayStore extends BaseStore<ArrayItem> {
    @observable _data: any = [];
    @observable filterByPageKey: string = null;

    @action
    setData(items: Array<any> = []): void {
        this._data.replace(items);
    }

    @computed
    get data(): Array<ArrayItem> {
        const rawData = toJS(this._data),
            data = rawData.map((item: any) => new ArrayItem(item));

        if (this.filterByPageKey !== null) {
            const filteredData = [];

            for (let i=0; i<data.length; i++) {
                const arrayItem = data[i];

                const filteredArrayItem = new ArrayItem({
                    name: arrayItem.name
                });

                // loop over all values to see if they exist on the selected URL
                for (let j=0; j<arrayItem.values.length; j++) {
                    const valueItem: ValueItem = arrayItem.values[j];

                    if (valueItem.hasPage(this.filterByPageKey)) {

                        filteredArrayItem.values.push(
                            new ValueItem({
                                name: valueItem.name,
                                pages: [this.filterByPageKey],
                                info: valueItem.info
                            })
                        );
                    }
                }

                if (filteredArrayItem.values.length > 0) {
                    filteredData.push(filteredArrayItem);
                }
            }

            return filteredData;
        }

        return data;
    }

    @action
    filterDataByUrl(key?: string): void {
        this.filterByPageKey = key || null;
    }
}