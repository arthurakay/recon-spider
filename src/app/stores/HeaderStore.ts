import BaseArrayStore from './base/BaseArrayStore';
import Header from '../models/Header';

export default class HeaderStore extends BaseArrayStore {
    constructor() {
        super({
            model: Header,
            socketKey: 'headers'
        });
    }
}