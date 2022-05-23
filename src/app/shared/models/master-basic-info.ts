import {Customizable} from '@gears-commons/models/form/customizable';
import { BusinessEntity } from '@shared/constants/business-entity';

export class MasterBasicInfo {
    id?: number;
    name?: string;
    businessEntity?: BusinessEntity;
    data?: any;
}
