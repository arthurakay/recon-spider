import BaseArrayStore from './base/BaseArrayStore';
import JsLib from '../models/JsLib';
import {action, reaction} from 'mobx';
import AllStores from './_AllStores';

export default class RetireJsStore extends BaseArrayStore {
    constructor() {
        super({
            model: JsLib,
            socketKey: 'retireJs'
        });
    }

    /**
     * override
     */
    initialize() {
        reaction(
            () => AllStores.sitemapStore.filterByUrl,
            action((url: string) => {
                this.filterDataByUrl(url);
            })
        );

        reaction(
            () => AllStores.crawlerStore.loading,
            action((isLoading: boolean) => {
                this.loading = isLoading;
            })
        );
    }
}