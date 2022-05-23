import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import {AlertComponent} from '@gears-commons/component/alert/alert.component';
import {AlertData} from '@gears-commons/component/alert/alert-data';
import {translate} from '@ngneat/transloco';
import {Response} from '@gears-commons/models';

@Injectable({
    providedIn: 'root'
})
export class GearsAlertService {

    constructor(protected snackBar: MatSnackBar) {
    }

    public showDeleteSuccessAlert(component: string): MatSnackBarRef<any> {
        return this.showSuccessAlert(translate('message.delete.success', {component: translate('component.' + component)}));
    }

    public showSaveSuccessAlert(component: string): MatSnackBarRef<any> {
        return this.showSuccessAlert(translate('message.save.success', {component: translate('component.' + component)}));
    }

    public showUpdateSuccessAlert(component: string): MatSnackBarRef<any> {
        return this.showSuccessAlert(translate('message.update.success', {component: translate('component.' + component)}));
    }

    public showSuccessAlert(message: string): MatSnackBarRef<any> {
        return this.snackBar.openFromComponent<AlertComponent>(AlertComponent, {
            duration: 4000,
            horizontalPosition: 'end',
            data: {
                type: 'success',
                iconLib: 'feather',
                icon: 'check-circle',
                message: message,
            } as AlertData
        });
    }

    public showErrorAlert(message: string, title?: string): MatSnackBarRef<any> {
        return this.snackBar.openFromComponent<AlertComponent>(AlertComponent, {
            duration: 4000,
            horizontalPosition: 'end',
            data: {
                type: 'error',
                iconLib: 'feather',
                icon: 'alert-triangle',
                message: message,
                title: title
            } as AlertData
        });
    }

    public onError(error: any, component?: string): void {
        if (!error || !error.error) {
            this.showErrorAlert('Error');
            return;
        }

        if (error.status === 0) {
            this.showErrorAlert(translate('message.common.networkError'));
            return;
        }

        const errorCode = error.error.statusCode;

        if (errorCode === Response.DATA_REMOVING_ERROR) {
            this.showErrorAlert(
                translate('message.delete.someEntitiesAssignedToThisComponent', {component: translate('component.' + component)}),
                translate('message.delete.cannotDelete'));
        } else if (errorCode === Response.BAD_REQUEST) {
            if (!error.error.errors.fieldErrors) {
                this.showErrorAlert(translate('message.save.error', {component: translate('component.' + component)}));
            }
        } else if(errorCode === Response.DATA_SAVING_ERROR) {
            this.showErrorAlert(error.error.message);
        } else {
            this.showErrorAlert(error.error.message);
        }
    }
}
