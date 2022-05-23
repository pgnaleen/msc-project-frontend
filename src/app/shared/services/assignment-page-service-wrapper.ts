import {Injectable} from '@angular/core';
import {EntityAssignmentService, GearsAlertService} from '@gears-commons/services';
import {ActivatedRoute, Router} from '@angular/router';
import {GearsDialogService} from '@gears-commons/services/gears-dialog-service';

@Injectable({
    providedIn: 'root'
})
export class AssignmentPageServiceWrapper {

    constructor(public entityAssignmentService: EntityAssignmentService<any>,
                public gearsAlertService: GearsAlertService,
                public activatedRoute: ActivatedRoute,
                public gearsDialogService: GearsDialogService,
                public router: Router) {
    }
}
