import CrawlerStore from './CrawlerStore';
import HeaderStore from './HeaderStore';
import SiteMapStore from './SiteMapStore';
import MetaTagsStore from './MetaTagStore';
import RetireJsStore from './RetireJsStore';

interface StoresInterface {
    [id: string]: any
}

const stores:StoresInterface = {
    crawlerStore: CrawlerStore,
    headerStore: HeaderStore,
    metaTagsStore: MetaTagsStore,
    retireJsStore: RetireJsStore,
    sitemapStore: SiteMapStore
};

const AllStores: StoresInterface = {};

export default AllStores;

export function initStores() {
    for (let store in stores) {
        AllStores[store] = new stores[store]()
    }
}