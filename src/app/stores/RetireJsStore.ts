import BaseArrayStore from './base/BaseArrayStore';
import JsLib from '../models/JsLib';

export default class RetireJsStore extends BaseArrayStore {
    constructor() {
        super({
            model: JsLib,
            socketKey: 'retireJs'
        });
    }
}