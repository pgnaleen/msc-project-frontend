import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Response} from '@gears-commons/models/response/response';
import {BaseFilter} from '../models/base-filter';
import {ObjectUtils} from '@gears-commons/utils/object-utils';
import {FormStructureResponse} from '@gears-commons/models';
import {DeleteResponse} from '@gears-commons/models/response/delete-response';

export abstract class BaseCrudService<T> {

    protected constructor(private http: HttpClient) {
    }

    getStructure(): Observable<Response<FormStructureResponse>> {
        return this.http.get<Response<FormStructureResponse>>(environment.apiBaseUrl + '/' + this.getContextPath() + '/structure');
    }

    getList(filter?: BaseFilter): Observable<Response<T[]>> {
        const filterJson = ObjectUtils.cloneAndRemoveNulls(filter);
        return this.http.get<Response<T[]>>(environment.apiBaseUrl + '/' + this.getContextPath(), {params: {...filterJson}});
    }

    getById(id: number): Observable<Response<T>> {
        return this.http.get<Response<T>>(environment.apiBaseUrl + '/' + this.getContextPath() + '/' + id);
    }

    create(requestBody: T | FormData): Observable<Response<T>> {
        return this.http.post<Response<T>>(environment.apiBaseUrl + '/' + this.getContextPath(), requestBody);
    }

    update(id: number, requestBody: T | FormData): Observable<Response<T>> {
        return this.http.put<Response<T>>(environment.apiBaseUrl + '/' + this.getContextPath() + '/' + id, requestBody);
    }

    delete(id: number): Observable<Response<DeleteResponse>> {
        return this.http.delete<Response<DeleteResponse>>(environment.apiBaseUrl + '/' + this.getContextPath() + '/' + id);
    }

    abstract getContextPath(): string;
}
