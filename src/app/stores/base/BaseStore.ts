import {observable, extendObservable, toJS, action, computed} from 'mobx';
import {BaseModel} from '../../models/base/BaseModel';

interface BaseStoreOptions {
    model: BaseModel,
    [id: string]: any
}

class BaseStore<T extends BaseModel> {
    @observable _data: any = [];
    @observable model:BaseModel = null;

    @observable loading: boolean = false;

    /**
     * @param additionalObservables
     * @param additionalObservables.model {Object}
     * @param additionalObservables.endpoints {Object}
     */
    constructor(options: BaseStoreOptions) {
        extendObservable(this, options);
    }

    @action
    setData(items: Array<any> = []): void {
        this._data.replace(items);
    }

    @computed
    get data(): Array<BaseModel> {
        const data = toJS(this._data);

        if (this.model) {
            return data.map((item: any) => new (<any>this.model)(item));
        }

        return data;
    }
}

export default BaseStore;