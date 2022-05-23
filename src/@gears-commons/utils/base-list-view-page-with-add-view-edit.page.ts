import {BaseListViewPage} from '@gears-commons/utils/base-list-view-page';
import {BaseFilter, Customizable} from '@gears-commons/models';
import {BaseCrudService} from '@gears-commons/services';
import {MasterServiceWrapper} from '@shared/services/master-service-wrapper';

export abstract class BaseListViewPageWithAddViewEditPage<T extends Customizable, F extends BaseFilter> extends BaseListViewPage<T, F> {

    constructor(_crudService: BaseCrudService<T>,
                protected masterServiceWrapper: MasterServiceWrapper) {
        super(_crudService, masterServiceWrapper.gearsDialogService,
            masterServiceWrapper.gearsAlertService,
            masterServiceWrapper.route, masterServiceWrapper.router);
    }

    protected executeViewAction(data: any): void {
        this.masterServiceWrapper.router.navigate([this.getAddViewEditPath(), 'view', data.id]);
    }

    protected executeEditAction(data: any): void {
        this.masterServiceWrapper.router.navigate([this.getAddViewEditPath(), 'edit', data.id]);
    }

    protected executeAddNewAction(): void {
        this.masterServiceWrapper.router.navigate([this.getAddViewEditPath(), 'add']);
    }

    protected abstract getAddViewEditPath(): string ;
}
