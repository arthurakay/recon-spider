import CrawlerStore from './CrawlerStore';
import HeaderStore from './HeaderStore';
import SiteMapStore from './SiteMapStore';
import MetaTagsStore from './MetaTagStore';
import NsLookupStore from './NsLookupStore';
import RetireJsStore from './RetireJsStore';
import WappalyzerStore from './WappalyzerStore';
import WhoIsStore from './WhoIsStore';
import DirbStore from './DirbStore';
import NiktoStore from './NiktoStore';

interface StoresInterface {
    [id: string]: any
}

const stores:StoresInterface = {
    crawlerStore: CrawlerStore,
    dirbStore: DirbStore,
    headerStore: HeaderStore,
    metaTagsStore: MetaTagsStore,
    niktoStore: NiktoStore,
    nsLookupStore: NsLookupStore,
    retireJsStore: RetireJsStore,
    sitemapStore: SiteMapStore,
    wappalyzerStore: WappalyzerStore,
    whoisStore: WhoIsStore
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