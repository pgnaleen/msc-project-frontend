import {BaseFilter} from '@gears-commons/models/base-filter';

export class StructureMasterFilter extends BaseFilter {
    baseEntity?: string;
    withData?: boolean;
    contextAssignmentId?: number;
    name?: string;
    code?: string;
    shortName?: string;
    activeStatus?: boolean;
}
