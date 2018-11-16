import {action, computed, observable, reaction} from 'mobx';
import BaseStore from './base/BaseStore';
import NsLookup from '../models/NsLookup';
import AllStores from './_AllStores';

interface NsLookupResponse {
    data: string;
}

export default class NsLookupStore extends BaseStore<NsLookup> {
    @observable _data: NsLookup = null;

    constructor() {
        super({
            model: NsLookup,
            socketKey: 'nslookup',
            single: true
        });
    }

    initialize():void {
        reaction(
            () => AllStores.crawlerStore.loading,
            action((isLoading: boolean) => {
                if (isLoading) {
                    this.loading = true;
                }
            })
        );
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