import {DataResponse} from '@gears-commons/models/data-response';
import {BaseModel} from '@gears-commons/models/base-model';

export class EntityAssignmentResponse<T extends BaseModel> extends DataResponse<T> {
    businessEntity?: string;
    parentBusinessEntity?: string;
    parentData?: any;
    activeStatus: boolean;
}
