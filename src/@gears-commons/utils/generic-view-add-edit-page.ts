import {translate} from '@ngneat/transloco';
import {Customizable, FormStructureResponse} from '@gears-commons/models';
import {BaseCrudService} from '@gears-commons/services';
import {BaseViewAddEditArea} from '@gears-commons/utils/base-view-add-edit-area';
import {RootData} from '@gears-commons/models/root-data';
import {BreadcrumbItem} from '@gears-commons/models/breadcrumb-item';
import {ActionMode} from '@gears-commons/types/action-mode';
import {Response} from '@gears-commons/models/response/response';
import {ViewAddEditPageServiceWrapper} from '@shared/services/view-add-edit-page-service-wrapper';
import {ActivatedRoute} from '@angular/router';
import {CommonEvents} from '@gears-commons/utils/common-events';

export abstract class BaseViewAddEditPage<T extends Customizable, S extends BaseCrudService<T>> extends BaseViewAddEditArea<T, S> {

    breadcrumbItems: BreadcrumbItem[];
    translationScope;

    protected constructor(protected crudService: S, protected _route: ActivatedRoute, protected viewAddEditServiceWrapper: ViewAddEditPageServiceWrapper) {
        super(crudService, viewAddEditServiceWrapper.gearsAlertService);

        this.loadHeaders();
        this.translationScope = 'form.' + this.getComponent();

        window.addEventListener(CommonEvents.LANGUAGE_CHANGED, (event: CustomEvent) => {
            if (this.rootData) {
                this.breadcrumbItems = this.createBreadcrumbItems(this.rootData?.mode, this.rootData?.data);
                this.title = this.generatePageTitle(this.rootData?.mode, this.rootData?.data);
            }
        });
    }

    loadHeaders(): void {
        const routeParams = this._route.snapshot.paramMap;
        const mode: ActionMode = routeParams.get('mode') ? routeParams.get('mode').toUpperCase() as ActionMode : null;

        this.crudService.getStructure().subscribe({
            next: response => {
                if (mode === 'VIEW' || mode === 'EDIT') {
                    const id: number = Number(routeParams.get('id'));
                    this.loadData(id, mode, response);
                } else {
                    this.onDataLoaded(mode, response, this.getEmptyDataObject());
                }
            }
        });
    }

    loadData(id: number, mode: ActionMode, response: Response<FormStructureResponse>): void {
        this.crudService.getById(id).subscribe(res => {
            this.onDataLoaded(mode, response, res.payload);
        });
    }

    onDataLoaded(mode: ActionMode, response: Response<FormStructureResponse>, data: T): void {
        const rootData: RootData<T> = {
            mode: mode,
            headers: response.payload.headers,
            data: data
        };
        this.breadcrumbItems = this.createBreadcrumbItems(mode, data);
        this.onRootDataInit(rootData);
    }

    initView(): void {
        this.readOnly = this.rootData.mode === 'VIEW';
        this.data = this.rootData.data;

        this.title = this.generatePageTitle(this.rootData.mode, this.rootData.data);
    }

    onDataSaved(): void {
        this.viewAddEditServiceWrapper.router.navigate(['../'], {relativeTo: this._route});
    }

    onDataUpdated(): void {
        this.viewAddEditServiceWrapper.router.navigate(['../../'], {relativeTo: this._route});
    }

    onDismissButtonClicked(): void {
        if (this.rootData.mode === 'EDIT') {
            this.rootData.mode = 'VIEW';
            this.onRootDataInit(this.rootData);
        } else {
            this.viewAddEditServiceWrapper.location.back();
        }
    }

    switchToEditMode(): void {
        this.rootData.mode = 'EDIT';
        this.onRootDataInit(this.rootData);
    }

    protected createBreadcrumbTitle(mode: ActionMode, data: T): string {
        if (mode === 'ADD') {
            return translate('title.page.addComponent', {component: translate('component.' + this.getComponent())});
        } else if (mode === 'VIEW') {
            return this.getBreadcrumbTitleComponent(data);
        } else if (mode === 'EDIT') {
            return this.getBreadcrumbTitleComponent(data);
        }
    }

    protected createBreadcrumbItems(mode: ActionMode, data: T): BreadcrumbItem[] {
        return [
            {label: 'component.master'},
            {label: 'component.' + this.getComponent(), routerLink: this.getComponentEndPointWebUrl()},
            {title: this.createBreadcrumbTitle(mode, data)}
        ];
    }

    protected getComponentEndPointWebUrl(): string {
        return '/masters/' + this.getComponent();
    }

    protected abstract getBreadcrumbTitleComponent(data: T): string;
}
