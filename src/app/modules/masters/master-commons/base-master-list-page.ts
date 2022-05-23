import {BaseFilter, Customizable, MenuItem} from '@gears-commons/models';
import {BaseListViewPageWithAddViewEditPage} from '@gears-commons/utils/base-list-view-page-with-add-view-edit.page';
import {BreadcrumbItem} from '@gears-commons/models/breadcrumb-item';
import {MasterServiceWrapper} from '@shared/services/master-service-wrapper';
import {BaseCrudService} from '@gears-commons/services';
import {CommonEvents} from '@gears-commons/utils/common-events';
import {TranslationHandler} from '../../../core/transloco/translation-handler';

export abstract class BaseMasterListPage<T extends Customizable, F extends BaseFilter> extends BaseListViewPageWithAddViewEditPage<T, F> {

    isSecondaryLanguage: boolean;

    constructor(_crudService: BaseCrudService<T>, protected masterServiceWrapper: MasterServiceWrapper) {
        super(_crudService, masterServiceWrapper);

        this.isSecondaryLanguage = TranslationHandler.getCurrentLanguage()?.level === 2;
        window.addEventListener(CommonEvents.LANGUAGE_CHANGED, (event: CustomEvent) => {
            this.isSecondaryLanguage = event?.detail?.language?.level === 2;
        });
    }
    protected createActions(): MenuItem[] {
        return [
            MenuItem.view(),
            MenuItem.delete()
        ];
    }

    protected createBreadcrumbItems(): BreadcrumbItem[] {
        return [
            {label: 'component.master'},
            {label: 'component.' + this.getComponent()}
        ];
    }

    protected getAddViewEditPath(): string {
        return '/masters/' + this.getComponent();
    }
}
