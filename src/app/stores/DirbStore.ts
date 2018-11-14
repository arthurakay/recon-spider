import {action, computed, observable, reaction} from 'mobx';
import BaseStore from './base/BaseStore';
import Dirb from '../models/Dirb';
import AllStores from './_AllStores';

interface DirbResponse {
    data: string;
}

export default class DirbStore extends BaseStore<Dirb> {
    @observable _data: Dirb = null;

    constructor() {
        super({
            model: Dirb,
            socketKey: 'dirb'
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
    setData(response: DirbResponse): void {
        this._data = new Dirb({
            value: response.data
        });
    }

    @computed
    get data(): Dirb {
        return this._data;
    }
}