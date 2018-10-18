import BaseTreeStore from './base/BaseTreeStore';
import {action, observable} from 'mobx';

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
}