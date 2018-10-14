import {action, computed, observable} from 'mobx';
import BaseStore from '../base/BaseStore';
import TreeNode from '../../models/TreeNode';

const ROOT = new TreeNode({
    key: '/',
    title: '___',
    children: []
});

export default class BaseTreeStore extends BaseStore<TreeNode> {
    @observable _data: any = ROOT;

    constructor(socketKey: string) {
        super({
            model: TreeNode,
            socketKey: socketKey
        });
    }

    @action
    setData(root: TreeNode): void {
        this._data = root;
    }

    @computed
    get data(): TreeNode {
        return this._data;
    }
}