import {action, computed, observable, reaction} from 'mobx';
import BaseStore from './base/BaseStore';
import Nikto from '../models/Nikto';
import AllStores from './_AllStores';

interface NiktoResponse {
    data: string;
    complete: boolean;
}

export default class NiktoStore extends BaseStore<Nikto> {
    @observable _data: Nikto = null;

    constructor() {
        super({
            model: Nikto,
            socketKey: 'nikto'
        });
    }

    initialize(): void {
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
    setData(response: NiktoResponse): void {
        this._data = new Nikto({
            value: response.data
        });
        this.loading = !response.complete;
    }

    @computed
    get data(): Nikto {
        return this._data;
    }
}