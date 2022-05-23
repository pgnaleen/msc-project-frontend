import {BaseFilter} from '@gears-commons/models/base-filter';

export class EntityAssignmentFilter extends BaseFilter {
    depth?: number;
    baseEntity?: string;
    assignedEntity?: string;
    untilEntity?: string;
    structureMasterId?: number;
    parentAssignmentId?: number;
    name?: string;
    code?: string;
    shortName?: string;
    activeStatus?: boolean;
}
