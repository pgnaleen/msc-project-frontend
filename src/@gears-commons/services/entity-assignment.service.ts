import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseModel, FieldUpdateResponse, FormUpdateRequest, Response} from '@gears-commons/models';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {EntityAssignmentResponse} from '@gears-commons/models/entity-assignment-response';
import {EntityAssignmentRequest} from '@gears-commons/models/entity-assignment-request';
import {EntityAssignmentFilter} from '@gears-commons/models/entity-assignment-filter';
import {ObjectUtils} from '@gears-commons/utils/object-utils';
import {FormDataUtils} from '@gears-commons/utils';
import {DeleteResponse} from '@gears-commons/models/response/delete-response';
import {EntityAssignmentBulkRequest} from '@gears-commons/models/entity-assignment-bulk-request';

@Injectable({
    providedIn: 'root'
})
export class EntityAssignmentService<T extends BaseModel> {

    constructor(private _httpClient: HttpClient) {
    }

    public createAssignment(assignmentRequest: EntityAssignmentRequest): Observable<Response<EntityAssignmentResponse<T>>> {
        const reqFormData = FormDataUtils.convertToFormData(assignmentRequest);
        return this._httpClient.post<Response<EntityAssignmentResponse<T>>>(environment.apiBaseUrl + '/entity-assignments', reqFormData);
    }

    public updateAssignment(assignmentRequest: EntityAssignmentRequest): Observable<Response<EntityAssignmentResponse<T>>> {
        const reqFormData = FormDataUtils.convertToFormData(assignmentRequest);
        return this._httpClient.put<Response<EntityAssignmentResponse<T>>>(environment.apiBaseUrl + '/entity-assignments', reqFormData);
    }

    public bulkUpdateAssignment(assignmentRequest: EntityAssignmentBulkRequest): Observable<Response<EntityAssignmentResponse<T>>> {
        // const reqFormData = FormDataUtils.convertToFormData(assignmentRequest);
        return this._httpClient.post<Response<EntityAssignmentResponse<T>>>(environment.apiBaseUrl + '/entity-assignments/bulk', assignmentRequest);
    }

    public getAssignments(filter: EntityAssignmentFilter): Observable<Response<EntityAssignmentResponse<T>[]>> {
        const filterJson = ObjectUtils.cloneAndRemoveNulls(filter);
        return this._httpClient.get<Response<EntityAssignmentResponse<T>[]>>(environment.apiBaseUrl + '/entity-assignments', {params: {...filterJson}});
    }

    public getChainAssignments(filter: EntityAssignmentFilter): Observable<Response<EntityAssignmentResponse<T>[]>> {
        const filterJson = ObjectUtils.cloneAndRemoveNulls(filter);
        return this._httpClient.get<Response<EntityAssignmentResponse<T>[]>>(environment.apiBaseUrl + '/entity-assignments/chain', {params: {...filterJson}});
    }

    public getParentAssignments(structureMasterId: number, contextAssignmentId: number): Observable<Response<EntityAssignmentResponse<T>[]>> {
        return this._httpClient.get<Response<EntityAssignmentResponse<T>[]>>(
            environment.apiBaseUrl + '/entity-assignments/' + structureMasterId + '/parent-assignments', {params: {contextAssignmentId}});
    }

    public getAssignmentById(assignmentId: number): Observable<Response<EntityAssignmentResponse<T>>> {
        return this._httpClient.get<Response<EntityAssignmentResponse<T>>>(environment.apiBaseUrl + '/entity-assignments/' + assignmentId);
    }

    public removeAssignment(removeIds: number[]): Observable<Response<DeleteResponse>> {
        return this._httpClient.delete<Response<DeleteResponse>>(environment.apiBaseUrl + '/entity-assignments', {params: {removeIds: removeIds}});
    }
}
