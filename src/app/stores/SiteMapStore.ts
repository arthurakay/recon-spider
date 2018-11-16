import BaseTreeStore from './base/BaseTreeStore';
import {action, observable, reaction} from 'mobx';
import AllStores from './_AllStores';

export default class SiteMapStore extends BaseTreeStore {
    @observable
    public filterByUrl: string = '';

    constructor() {
        super('sitemap');
    }

    @action
    setFilter(url?: string) {
        this.filterByUrl = url ? url : null;
    }

    initialize() {
        reaction(
            () => AllStores.crawlerStore.loading,
            action((isLoading: boolean) => {
                this.loading = isLoading;
            })
        );
    }
}