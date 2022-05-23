import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Response, SupportedLanguage} from '@gears-commons/models';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {

    constructor(private http: HttpClient) {
    }

    getSupportedLanguages(): Observable<Response<SupportedLanguage[]>> {
        return this.http.get<Response<SupportedLanguage[]>>('/langs');
    }
}
