import {BaseModel} from './base/BaseModel';

export default class MetaTag extends BaseModel {
    public name: string;
    public values: Array<string>
}