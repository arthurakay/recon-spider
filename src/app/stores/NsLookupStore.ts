import {action, computed, observable} from 'mobx';
import BaseStore from './base/BaseStore';
import NsLookup from '../models/NsLookup';

interface NsLookupResponse {
    data: string;
}

export default class NsLookupStore extends BaseStore<NsLookup> {
    @observable _data: NsLookup = null;

    constructor() {
        super({
            model: NsLookup,
            socketKey: 'nslookup'
        });
    }

    @action
    setData(response: NsLookupResponse): void {
        this._data = new NsLookup({
            value: response.data
        });
    }

    @computed
    get data(): NsLookup {
        return this._data;
    }
}