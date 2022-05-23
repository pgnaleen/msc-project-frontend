import {EntityAssignmentRequest} from '@gears-commons/models/entity-assignment-request';

export class EntityAssignmentBulkRequest {
    assignmentRequests: EntityAssignmentRequest[];
    unAssignRequests: number[];
    contextAssignmentId: number;
}
