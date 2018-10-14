import {BaseModel} from './base/BaseModel';

export default class TreeNode extends BaseModel {
    public key: string;
    public title: string;
    public children: Array<TreeNode>;
}