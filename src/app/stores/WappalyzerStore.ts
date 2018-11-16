import BaseArrayStore from './base/BaseArrayStore';
import JsLib from '../models/JsLib';
import {action, reaction} from 'mobx';
import AllStores from './_AllStores';

export default class WappalyzerStore extends BaseArrayStore {
    constructor() {
        super({
            model: JsLib,
            socketKey: 'wappalyzer'
        });
    }

    /**
     * override
     */
    initialize() {
        reaction(
            () => AllStores.crawlerStore.loading,
            action((isLoading: boolean) => {
                if (isLoading) {
                    this.loading = true;
                }
            })
        );

        reaction(
            () => AllStores.sitemapStore.filterByUrl,
            action((url: string) => {
                this.filterDataByUrl(url);
            })
        );
    }

    @action
    setData(items: Array<any> = []): void {
        this._data.replace(items);
        this.loading = false;
    }
}