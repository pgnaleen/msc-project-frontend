import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {FuseAlertComponent} from '../../../@fuse/components/alert';
import {AlertData} from '@gears-commons/component/alert/alert-data';

@Component({
    selector: 'gears-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    @ViewChild('errorAlert')
    fuseAlertComponent: FuseAlertComponent;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: AlertData,
                public snackBarRef: MatSnackBarRef<any>) {
    }

    onDismiss(dismissed: boolean): void {
        if (dismissed) {
            this.snackBarRef.dismiss();
        }
    }

    ngOnInit(): void {
    }
}
