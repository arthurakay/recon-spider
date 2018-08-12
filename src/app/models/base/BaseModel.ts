import * as _ from 'lodash';

export type BaseModelOptions = { [id: string]: any };

export abstract class BaseModel {
    constructor(properties: BaseModelOptions = {}) {
        _.assign(this, properties);

        return this;
    }
}