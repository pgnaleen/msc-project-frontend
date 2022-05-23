import {
    BaseFilter,
    Customizable,
    FormHeader,
    FormStructureResponse,
    MenuItem,
    Response,
    ResponseMetaData,
    TableDataRow,
    TableRowAction
} from '@gears-commons/models';
import {BaseCrudService} from '@gears-commons/services';
import {BreadcrumbItem} from '@gears-commons/models/breadcrumb-item';
import {GearsAlertService} from '@gears-commons/services/gears-alert.service';
import {GearsDialogService} from '@gears-commons/services/gears-dialog-service';
import {FilterItem} from '@gears-commons/models/filter-item';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ObjectUtils} from '@gears-commons/utils/object-utils';
import {Subject, takeUntil} from 'rxjs';
import {Component, OnDestroy} from '@angular/core';

@Component({
    template: ''
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class BaseListViewPage<T extends Customizable, F extends BaseFilter> implements OnDestroy {

    dataList: T[] = [];
    headers: FormHeader[] = [];
    headersLoaded = false;

    actions: MenuItem[];
    breadcrumbItems: BreadcrumbItem[];

    metaData: ResponseMetaData = new ResponseMetaData();
    filter: BaseFilter = new BaseFilter() as F;
    filterItems: FilterItem[] = [];

    public loading = true;
    component: string;

    private unsubscribeRouterParams: Subject<any> = new Subject<any>();

    protected constructor(private _crudService: BaseCrudService<T>, private _gearsDialogService: GearsDialogService,
                          protected _gearsAlertService: GearsAlertService,
                          private _route: ActivatedRoute, private _router: Router) {
        this.init();
    }

    public init(): void {
        this.component = this.getComponent();
        this.actions = this.createActions();
        this.breadcrumbItems = this.createBreadcrumbItems();
        this.initFilterItems();
        this.readAndSetParams();
    }

    public readAndSetParams(): void {
        this._route.queryParams
            .pipe(takeUntil(this.unsubscribeRouterParams))
            .subscribe((params: Params) => {
                const newFilters = {} as F;
                Object.keys(params).forEach(paramKey => {
                    const filterItemSelected = this.filterItems.find(filterItem => filterItem.field === paramKey);

                    if (filterItemSelected) {
                        if (filterItemSelected.valueFieldType === 'boolean') {
                            newFilters[paramKey] = JSON.parse(params[paramKey]);
                        } else if (filterItemSelected.valueFieldType === 'number') {
                            newFilters[paramKey] = Number(params[paramKey]);
                        } else {
                            newFilters[paramKey] = params[paramKey];
                        }
                    } else if (paramKey === 'sortBy') {
                        newFilters[paramKey] = [params[paramKey]];
                    } else {
                        newFilters[paramKey] = params[paramKey];
                    }
                });

                this.filter = {...this.filter, ...newFilters};

                setTimeout(() => {
                    if (!this.headersLoaded) {
                        this.loadHeaders();
                    } else {
                        this.loadData();
                    }
                });
            });
    }

    ngOnDestroy(): void {
        this.unsubscribeRouterParams.next(null);
        this.unsubscribeRouterParams.complete();
    }

    public initFilterItems(): void {
        this.filterItems = [
            FilterItem.activeStatus()
        ];
    }

    public loadData(): void {
        this.loading = true;
        this.setContextVariablesToFilter();
        this._crudService.getList(this.filter).subscribe(uniResponse => {
            this.onDataLoaded(uniResponse);
        });
    }

    public setContextVariablesToFilter(): void {
    }

    public onActionPicked(rowAction: TableRowAction): void {
        if (rowAction.action === 'view') {
            this.executeViewAction(rowAction.data);
        } else if (rowAction.action === 'edit') {
            this.executeEditAction(rowAction.data);
        } else if (rowAction.action === 'delete') {
            this.showDeleteDialog(rowAction.data);
        }
    }

    public onFilterChanged(filter: F): void {
        const filterValidated = ObjectUtils.cloneAndRemoveNulls(this.filter);
        delete filterValidated.contextAssignmentId;

        this.updateRouterParams(filterValidated);
    }

    public updateRouterParams(params: any): void {
        this._router.navigate([], {
            relativeTo: this._route,
            queryParams: params
        });
    }

    public showDeleteDialog(rowData: TableDataRow): void {
        const dialogRef = this._gearsDialogService.openDeleteDialog(this.component);

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this._crudService.delete(rowData.id).subscribe({
                    next: response => {
                        this._gearsAlertService.showDeleteSuccessAlert(this.component);
                        this.onDataDeleted(rowData);
                        if (this.dataList?.length === 1 && this.filter.pageNo > 0) {
                            this.filter.pageNo--;
                        }
                        this.loadData();
                    }, error: error => {
                        this._gearsAlertService.onError(error, this.component);
                    }
                });
            }
        });
    }

    public onAddButtonClicked(): void {
        this.executeAddNewAction();
    }

    protected onDataDeleted(deletedData: any): void {
    }

    protected loadHeaders(): void {
        this._crudService.getStructure().subscribe({
            next: response => {
                this.onHeadersLoaded(response);
                this.headersLoaded = true;
            }, error: error => {
                this._gearsAlertService.onError(error, this.component);
            }
        });
    }

    protected onHeadersLoaded(response: Response<FormStructureResponse>): void {
        this.headers = response.payload.headers;

        this.loadData();
    }

    protected onDataLoaded(response: Response<T[]>): void {
        this.dataList = response.payload;
        this.loading = false;
        this.metaData = response.metadata;
    }

    protected abstract executeViewAction(data: any): void;

    protected abstract executeEditAction(data: any): void;

    protected abstract executeAddNewAction(): void;

    protected abstract createActions(): MenuItem[];

    protected abstract createBreadcrumbItems(): BreadcrumbItem[];

    protected abstract getComponent(): string;
}
