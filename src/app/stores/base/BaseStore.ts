import {observable, extendObservable, action, computed} from 'mobx';
import {BaseModel} from '../../models/base/BaseModel';

interface BaseStoreOptions {
    model: BaseModel,
    [id: string]: any,
    socketKey: string
}

class BaseStore<T extends BaseModel> {
    private socketKey: string = '';

    @observable _data: any = null;
    @observable model:BaseModel = null;
    @observable loading: boolean = false;

    /**
     * @param additionalObservables
     * @param additionalObservables.model {Object}
     * @param additionalObservables.endpoints {Object}
     */
    constructor(options: BaseStoreOptions) {
        extendObservable(this, options);

        const global = (<any>window);

        global.SOCKET.on(this.socketKey, (jsonMsg: string) => {
            this.loading = false;

            this.setData(JSON.parse(jsonMsg));
        });

        global.SOCKET.on('error', (jsonMsg: string) => {
            this.loading = false;

            // TODO: something...
            console.error('An error was reported by the socket response.')
        });
    }

    @action
    setData(data: any): void {}

    @computed
    get data(): any {
        return true;
    }
}

export default BaseStore;