import {Injectable} from '@angular/core';
import {FuseConfirmationConfig, FuseConfirmationService} from '../../@fuse/services/confirmation';
import {MatDialogRef} from '@angular/material/dialog';
import {FuseConfirmationDialogComponent} from '../../@fuse/services/confirmation/dialog/dialog.component';
import {translate} from '@ngneat/transloco';

@Injectable({
    providedIn: 'root'
})
export class GearsDialogService {

    constructor(private fuseConfirmationService: FuseConfirmationService) {
    }

    public openFromConfig(config: FuseConfirmationConfig = {}): MatDialogRef<FuseConfirmationDialogComponent> {
        return this.fuseConfirmationService.open(config);
    }

    public showContextNotSelectedMessage(): MatDialogRef<FuseConfirmationDialogComponent> {
        return this.openFromConfig({
            title: translate('contextFilter.dialog.title'),
            message: translate('contextFilter.dialog.message'),
            dismissible: false,
            icon: {
                show: true,
                color: 'warn'
            },
            actions: {
                confirm: {
                    label: translate('dialog.common.okAction'),
                    show: true,
                    color: 'warn'
                },
                cancel: {
                    show: false
                }
            }
        });
    }

    public openWarnDialog(title: string, message: string, icon?: string, confirmAction?: string,
                          cancelAction?: string): MatDialogRef<FuseConfirmationDialogComponent> {
        return this.openFromConfig({
            title: title,
            message: message,
            dismissible: false,
            icon: {
                show: true,
                name: icon,
                color: 'warn'
            },
            actions: {
                confirm: {
                    label: confirmAction || translate('dialog.common.confirmAction'),
                    show: true,
                    color: 'warn'
                },
                cancel: {
                    label: cancelAction || translate('dialog.common.cancelAction'),
                    show: true
                }
            }
        });
    }

    public openDeleteDialog(component: string): MatDialogRef<FuseConfirmationDialogComponent> {
        return this.openWarnDialog(
            translate('dialog.delete.title', {component: translate('component.' + component)}),
            translate('dialog.delete.message', {component: translate('component.' + component)}),
            'heroicons_outline:exclamation',
            translate('dialog.delete.confirmAction'),
            translate('dialog.delete.cancelAction'));
    }
}
