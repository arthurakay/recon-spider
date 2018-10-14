import {action, observable} from 'mobx';
import {makeRequest} from '../Request';

export default class CrawlerStore {
    private socketKey: string = 'crawler';

    @observable
    public loading: boolean = false;

    constructor() {
        const global = (<any>window);

        global.SOCKET.on(this.socketKey, (jsonMsg: string) => {
            this.loading = false;
        });
    }

    @action
    crawlWebsite = (domain: string, maxDepth: number) => {
        this.loading = true;

        makeRequest({
            url: '/api/crawl',
            method: 'POST',
            data: {
                domain: domain,
                maxDepth: maxDepth
            }
        });
    }
}