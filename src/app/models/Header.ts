import {BaseModel} from './base/BaseModel';

export default class Header extends BaseModel {
    public name: string;
    public values: Array<string>
}