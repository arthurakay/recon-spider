import {reaction, action} from 'mobx';
import BaseArrayStore from './base/BaseArrayStore';
import Header from '../models/Header';
import AllStores from './_AllStores';

export default class HeaderStore extends BaseArrayStore {
    constructor() {
        super({
            model: Header,
            socketKey: 'headers'
        });
    }

    // /**
    //  * override
    //  */
    // initialize() {
    //     reaction(
    //         () => AllStores.sitemapStore.filterByUrl,
    //         action((url: string) => {
    //             this.filterDataByUrl(url);
    //         })
    //     );
    // }
}