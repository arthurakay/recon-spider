import {action, computed, observable, toJS} from 'mobx';
import BaseStore from '../base/BaseStore';
import ArrayItem from '../../models/base/ArrayItem';

export default class BaseArrayStore extends BaseStore<ArrayItem> {
    @observable _data: any = [];
    @observable filterByPageKey: string = null;

    @action
    setData(items: Array<any> = []): void {
        this._data.replace(items);
        console.log(items)
    }

    @computed
    get data(): Array<ArrayItem> {
        const data = toJS(this._data);

        let filteredData;
        if (this.filterByPageKey !== null) {
            filteredData = data.filter((item: any) => {
                return item.pages.includes(this.filterByPageKey);
            });
        } else {
            filteredData = data;
        }

        return filteredData.map((item: any) => new (<any>this.model)(item));
    }

    @action
    filterDataByPage(key: string): void {
        this.filterByPageKey= key;
    }

    @action
    clearFilterByPage(): void {
        this.filterByPageKey = null;
    }
}