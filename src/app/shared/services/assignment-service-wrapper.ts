import {Injectable} from '@angular/core';
import {EntityAssignmentService, FormService, GearsAlertService} from '@gears-commons/services';
import {GearsDialogService} from '@gears-commons/services/gears-dialog-service';
import {TranslocoService} from '@ngneat/transloco';
import {MatDialog} from '@angular/material/dialog';
import {Customizable} from '@gears-commons/models';

@Injectable({
    providedIn: 'root'
})
export class AssignmentServiceWrapper<T extends Customizable> {

    constructor(public entityAssignmentService: EntityAssignmentService<T>,
                public formService: FormService,
                public gearsDialogService: GearsDialogService,
                public translocoService: TranslocoService,
                public dialog: MatDialog,
                public gearsAlertService: GearsAlertService) {
    }
}
