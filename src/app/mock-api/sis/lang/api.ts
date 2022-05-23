import {Injectable} from '@angular/core';
import {cloneDeep} from 'lodash-es';
import {FuseMockApiService} from '@fuse/lib/mock-api/mock-api.service';
import {langs as langsData} from 'app/mock-api/sis/lang/data';
import {Response} from '@gears-commons/models/response/response';
import {SupportedLanguage} from '@gears-commons/models';

@Injectable({
    providedIn: 'root'
})
export class LangMockApi {
    private _langs: Response<SupportedLanguage[]> = langsData;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ langs - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('/langs')
            .reply(() => {

                // Clone the langs
                const langs = cloneDeep(this._langs);
                return [200, langs];
            });
    }
}
