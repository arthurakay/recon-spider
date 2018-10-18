import BaseArrayStore from './base/BaseArrayStore';
import MetaTag from '../models/MetaTag';
import {action, reaction} from 'mobx';
import AllStores from './_AllStores';

export default class MetaTagStore extends BaseArrayStore {
    constructor() {
        super({
            model: MetaTag,
            socketKey: 'metaTags'
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
    }
}