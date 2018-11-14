import {action, computed, observable, reaction} from 'mobx';
import BaseStore from './base/BaseStore';
import WhoIs from '../models/WhoIs';
import AllStores from './_AllStores';

interface WhoIsResponse {
    data: string;
}

export default class WhoIsStore extends BaseStore<WhoIs> {
    @observable _data: WhoIs = null;

    constructor() {
        super({
            model: WhoIs,
            socketKey: 'whois'
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
    setData(response: WhoIsResponse): void {
        this._data = new WhoIs({
            value: response.data
        });
    }

    @computed
    get data(): WhoIs {
        return this._data;
    }
}