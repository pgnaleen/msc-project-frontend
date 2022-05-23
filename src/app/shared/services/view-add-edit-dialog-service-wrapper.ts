import {Injectable} from '@angular/core';
import {GearsAlertService} from '@gears-commons/services';
import {TranslocoService} from '@ngneat/transloco';
import {DialogData} from '@gears-commons/models';
import {MatDialogRef} from '@angular/material/dialog';

@Injectable({
    providedIn: 'root'
})
export class ViewAddEditDialogServiceWrapper {

    constructor(public dialogData: DialogData,
                public translocoService: TranslocoService,
                public gearsAlertService: GearsAlertService,
                public dialogRef: MatDialogRef<any>) {
    }
}
