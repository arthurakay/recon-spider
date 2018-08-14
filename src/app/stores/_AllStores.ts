import CrawlerStore from './CrawlerStore';
import HeaderStore from './HeaderStore';

interface StoresInterface {
    [id: string]: any
}

const stores:StoresInterface = {
    headerStore: HeaderStore,
    crawlerStore: CrawlerStore
};

const AllStores: StoresInterface = {};

export default AllStores;

export function initStores() {
    for (let store in stores) {
        AllStores[store] = new stores[store]()
    }
}