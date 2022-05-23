import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {Observable} from 'rxjs';
import {BaseFilter, StructureMasterFilter} from '@gears-commons/models';

@Injectable({
    providedIn: 'root'
})
export class MasterService {

    constructor(private httpClient: HttpClient) {
    }

    getComponentListByBaseEntity(baseEntity: string, filter?: StructureMasterFilter): Observable<any> {
        return this.httpClient.get(environment.apiBaseUrl + '/masters/' + baseEntity,
            {params: {withData: true, pageSize: BaseFilter.UNLIMITED_PAGE_SIZE, ...filter}});
    }
}
