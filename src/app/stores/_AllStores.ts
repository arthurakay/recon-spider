import CrawlerStore from './CrawlerStore';
import HeaderStore from './HeaderStore';
import SiteMapStore from './SiteMapStore';

interface StoresInterface {
    [id: string]: any
}

const stores:StoresInterface = {
    headerStore: HeaderStore,
    crawlerStore: CrawlerStore,
    sitemapStore: SiteMapStore
};

const AllStores: StoresInterface = {};

export default AllStores;

export function initStores() {
    for (let store in stores) {
        AllStores[store] = new stores[store]()
    }
}