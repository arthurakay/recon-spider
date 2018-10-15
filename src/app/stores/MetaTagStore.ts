import BaseArrayStore from './base/BaseArrayStore';
import MetaTag from '../models/MetaTag';

export default class MetaTagStore extends BaseArrayStore {
    constructor() {
        super({
            model: MetaTag,
            socketKey: 'metaTags'
        });
    }
}