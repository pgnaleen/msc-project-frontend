import {BaseModel} from '@gears-commons/models/base-model';

export class DataResponse<T extends BaseModel> extends BaseModel{
    data: T;
    referenceId: number;
}
