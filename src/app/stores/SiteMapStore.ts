import {action, observable} from 'mobx';

interface TreeNode {
    key: string;
    title: string;
    children: Array<TreeNode>;
}

export default class SiteMapStore {
    private socketKey: string = 'sitemap';

    @observable
    public loading: boolean = false;

    @observable
    public root: TreeNode = {
        key: '/',
        title: '/',
        children: []
    };

    constructor() {
        const global = (<any>window);

        global.SOCKET.on(this.socketKey, (jsonMsg: string) => {
            this.loading = false;

            this.root = JSON.parse(jsonMsg);
        });
    }
}