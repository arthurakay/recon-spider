import {action, computed, observable, toJS} from 'mobx';
import BaseStore from '../base/BaseStore';
import {BaseModel} from '../../models/base/BaseModel';

export default class BaseArrayStore extends BaseStore<BaseModel> {
    @observable _data: any = [];

    @action
    setData(items: Array<any> = []): void {
        this._data.replace(items);
    }

    @computed
    get data(): Array<BaseModel> {
        const data = toJS(this._data);

        if (this.model) {
            return data.map((item: any) => new (<any>this.model)(item));
        }

        return data;
    }
}