import {Injectable} from '@angular/core';
import {GearsAlertService} from '@gears-commons/services';
import {TranslocoService} from '@ngneat/transloco';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ViewAddEditPageServiceWrapper {

    constructor(public translocoService: TranslocoService,
                public router: Router,
                public location: Location,
                public gearsAlertService: GearsAlertService) {
    }
}
