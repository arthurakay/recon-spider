import BaseStore from './base/BaseStore';
import Header from '../models/Header';

export default class HeaderStore extends BaseStore<Header> {

    constructor() {
        super({
            model: Header
        });
    }
}