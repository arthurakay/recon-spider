import CrawlerStore from './CrawlerStore';
import HeaderStore from './HeaderStore';
import SiteMapStore from './SiteMapStore';
import MetaTagsStore from './MetaTagStore';
import NsLookupStore from './NsLookupStore';
import RetireJsStore from './RetireJsStore';
import WappalyzerStore from './WappalyzerStore';

interface StoresInterface {
    [id: string]: any
}

const stores:StoresInterface = {
    crawlerStore: CrawlerStore,
    headerStore: HeaderStore,
    metaTagsStore: MetaTagsStore,
    nsLookupStore: NsLookupStore,
    retireJsStore: RetireJsStore,
    sitemapStore: SiteMapStore,
    wappalyzerStore: WappalyzerStore
};

const AllStores: StoresInterface = {};

export default AllStores;

export function constructStores() {
    for (let store in stores) {
        AllStores[store] = new stores[store]();
    }
}

export function initStores() {
    for (let store in AllStores) {
        AllStores[store].initialize && AllStores[store].initialize();
    }
}