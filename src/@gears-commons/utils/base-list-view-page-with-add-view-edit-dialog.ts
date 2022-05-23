import {BaseListViewPage} from '@gears-commons/utils/base-list-view-page';
import {BaseFilter, Customizable, DialogData} from '@gears-commons/models';
import {BaseCrudService} from '@gears-commons/services';
import {MatDialog} from '@angular/material/dialog';
import {GearsAlertService} from '@gears-commons/services/gears-alert.service';
import {GearsDialogService} from '@gears-commons/services/gears-dialog-service';
import {ActivatedRoute, Router} from '@angular/router';

export abstract class BaseListViewPageWithAddViewEditDialog<T extends Customizable, F extends BaseFilter> extends BaseListViewPage<T, F> {

    protected constructor(private crudService: BaseCrudService<T>, private gearsDialogService: GearsDialogService,
                          public dialog: MatDialog, protected gearsAlertService: GearsAlertService,
    private route: ActivatedRoute, private router: Router) {
        super(crudService, gearsDialogService, gearsAlertService, route, router);
    }

    protected showViewAddEditDialog(dialogData: DialogData): void {
        dialogData.headers = this.headers;
        const dialogRef = this.dialog.open(this.getViewAddEditDialog(), {
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadData();
            }
        });
    }

    protected executeViewAction(data: any): void {
        this.showViewAddEditDialog({mode: 'VIEW', data: data});
    }

    protected executeEditAction(data: any): void {
        this.showViewAddEditDialog({mode: 'EDIT', data: data});
    }

    protected executeAddNewAction(): void {
        this.showViewAddEditDialog({mode: 'ADD'});
    }

    protected abstract getViewAddEditDialog(): any;
}
