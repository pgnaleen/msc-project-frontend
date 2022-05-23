import {Injectable} from '@angular/core';
import {GearsDialogService} from '@gears-commons/services/gears-dialog-service';
import {GearsAlertService} from '@gears-commons/services';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class MasterServiceWrapper {

    constructor(public gearsDialogService: GearsDialogService,
                public gearsAlertService: GearsAlertService,
                public router: Router,
                public route: ActivatedRoute) {
    }
}
