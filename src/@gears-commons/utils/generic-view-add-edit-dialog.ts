import {Customizable, FormHeader} from '@gears-commons/models';
import {BaseCrudService} from '@gears-commons/services';
import {BaseViewAddEditArea} from '@gears-commons/utils/base-view-add-edit-area';
import {RootData} from '@gears-commons/models/root-data';
import {ObjectUtils} from '@gears-commons/utils/object-utils';
import {ViewAddEditDialogServiceWrapper} from '@shared/services/view-add-edit-dialog-service-wrapper';

export abstract class BaseViewAddEditDialog<T extends Customizable, S extends BaseCrudService<T>> extends BaseViewAddEditArea<T, S> {

    title = '';
    headersMap: { [key: string]: FormHeader } = {};

    data: T = this.getEmptyDataObject();
    readOnly = true;

    protected constructor(private crudService: S, protected viewAddEditDialogServiceWrapper: ViewAddEditDialogServiceWrapper) {
        super(crudService, viewAddEditDialogServiceWrapper.gearsAlertService);

        const rootData: RootData<T> = {
            mode: viewAddEditDialogServiceWrapper.dialogData.mode,
            headers: viewAddEditDialogServiceWrapper.dialogData.headers,
            data: viewAddEditDialogServiceWrapper.dialogData.data
        };
        this.onRootDataInit(rootData);
    }

    initView(): void {
        this.readOnly = this.rootData.mode === 'VIEW';

        if (this.rootData.mode !== 'ADD') {
            this.data = ObjectUtils.clone(this.rootData.data);
        }

        this.title = this.generatePageTitle(this.rootData.mode, this.rootData.data);
    }

    onDataSaved(): void {
        this.viewAddEditDialogServiceWrapper.dialogRef.close(true);
    }

    onDataUpdated(): void {
        this.viewAddEditDialogServiceWrapper.dialogRef.close(true);
    }

    onDismissButtonClicked(): void {
        this.viewAddEditDialogServiceWrapper.dialogRef.close();
    }
}
