import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response} from '@gears-commons/models/response/response';
import {FormStructureResponse} from '@gears-commons/models/form/form-structure-response';
import {FormUpdateRequest} from '@gears-commons/models/form/form-update-request';
import {FieldUpdateResponse} from '@gears-commons/models/form/field-update-response';
import {Form} from '@angular/forms';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FormService {

    constructor(private http: HttpClient) {
    }

    getAllForms(): Observable<Response<Form[]>> {
        return this.http.get<Response<Form[]>>(environment.apiBaseUrl + '/forms');
    }

    getFormById(formId: number): Observable<Response<FormStructureResponse>> {
        const params = {withData: 'false'};
        return this.http.get<Response<FormStructureResponse>>(environment.apiBaseUrl + '/forms/' + formId, {params});
    }

    getFormByDescriptor(descriptor: string | null): Observable<Response<FormStructureResponse>> {
        return this.http.get<Response<FormStructureResponse>>(environment.apiBaseUrl + '/forms/by-descriptor/' + descriptor);
    }

    updateForm(formId: number, updateRequest: FormUpdateRequest): Observable<Response<FieldUpdateResponse>> {
        return this.http.put<Response<FieldUpdateResponse>>(environment.apiBaseUrl + '/forms/' + formId, updateRequest);
    }
}
