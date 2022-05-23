import {BaseFilter, Customizable, TableRowAction} from '@gears-commons/models';
import {EntityAssignmentResponse} from '@gears-commons/models/entity-assignment-response';
import {Component, OnDestroy, ViewChild} from '@angular/core';
import {BaseAssignmentListComponent} from '@gears-commons/utils/base-assignment-list';
import {BreadcrumbItem} from '@gears-commons/models/breadcrumb-item';
import {SearchInputComponent} from '@gears-commons/component';
import {FuseDrawerComponent} from '../../@fuse/components/drawer';
import {BaseDrawerComponent} from '@gears-commons/utils/base-drawer-component';
import {translate} from '@ngneat/transloco';
import {MainFilter} from '@shared/models/main-filter';
import {AssignmentPageServiceWrapper} from '@shared/services/assignment-page-service-wrapper';
import {FilterItem} from '@gears-commons/models/filter-item';
import {EntityAssignmentFilter} from '@gears-commons/models/entity-assignment-filter';
import {ObjectUtils} from '@gears-commons/utils/object-utils';
import {Subject, takeUntil} from 'rxjs';

@Component({
    template: ''
})
export abstract class BaseAssignmentsListViewPageComponent<T extends Customizable, F extends BaseFilter> implements OnDestroy {

    @ViewChild('childAssignments')
    childAssignmentListComponent: BaseAssignmentListComponent<any>;

    @ViewChild('parentAssignments')
    parentAssignmentListComponent: BaseAssignmentListComponent<any>;

    @ViewChild('assignDrawer')
    assignDrawer: FuseDrawerComponent;

    @ViewChild('viewAssignmentDrawer')
    viewAssignmentDrawer: FuseDrawerComponent;

    @ViewChild('assignContent')
    assignContent: BaseDrawerComponent;

    @ViewChild('viewAssignmentContent')
    viewAssignmentContent: BaseDrawerComponent;

    @ViewChild('searchInput')
    searchInputComponent: SearchInputComponent;

    selectedParentId: number;
    selectedParent: EntityAssignmentResponse<any>;

    selectedChild: any;

    breadcrumbItems: BreadcrumbItem[];
    filterItems: FilterItem[] = [];

    filter: EntityAssignmentFilter = new EntityAssignmentFilter();

    public loading = true;

    parentComponent: string;
    parentComponentPlural: string;
    childComponent: string;
    childComponentPlural: string;

    private unsubscribeRouterParams: Subject<any> = new Subject<any>();

    constructor(protected assignmentServiceWrapper: AssignmentPageServiceWrapper) {
        this.init();
    }

    public init(): void {
        this.parentComponent = this.getParentComponent();
        this.parentComponentPlural = this.getParentComponentPlural();
        this.childComponent = this.getChildComponent();
        this.childComponentPlural = this.getChildComponentPlural();
        this.breadcrumbItems = this.createBreadcrumbItems();
        this.readAndSetParams();
        this.initFilterItems();
    }

    public initFilterItems(): void {
        this.filterItems = [
            FilterItem.activeStatus()
        ];
    }

    readAndSetParams(): void {
        this.assignmentServiceWrapper.activatedRoute.queryParams
            .pipe(takeUntil(this.unsubscribeRouterParams))
            .subscribe(params => {
                this.unsubscribeRouterParams.next(null);
                this.unsubscribeRouterParams.complete();
                Object.keys(params).forEach(paramKey => {
                    this.filter[paramKey] = params[paramKey];
                });

                if (this.filter.parentAssignmentId) {
                    this.selectedParentId = this.filter.parentAssignmentId;

                    if (this.selectedParent == null) {
                        this.assignmentServiceWrapper.entityAssignmentService.getAssignmentById(this.selectedParentId).subscribe({
                            next: response => {
                                this.selectedParent = response.payload;
                            }, error: error => {
                                this.assignmentServiceWrapper.gearsAlertService.onError(error, this.childComponent);
                            }
                        });
                    }

                    setTimeout(() => {
                        this.childAssignmentListComponent.loadData();
                    });
                }
            });
    }

    ngOnDestroy(): void {
        this.unsubscribeRouterParams.next(null);
        this.unsubscribeRouterParams.complete();
    }

    //When filter option values change
    public onFilterChange(filter: MainFilter): void {
        this.parentAssignmentListComponent.onFilterChanged();

        const filterValidated = ObjectUtils.cloneAndRemoveNulls(this.filter);
        delete filterValidated.pageNo;
        delete filterValidated.contextAssignmentId;
        delete filterValidated.sortDirection;

        this.selectedParentId = null;
        this.selectedParent = null;

        this.updateRouterParams(filterValidated);
    }

    public onAssignButtonClicked(): void {
        if (this.assignmentServiceWrapper.contextService.getSelectedChildId() == null) {
            this.assignmentServiceWrapper.gearsDialogService.showContextNotSelectedMessage();
            return;
        }

        this.executeAssignAction();
    }

    public onActionPicked(rowAction: TableRowAction): void {
        if (rowAction.action === 'view') {
            this.executeViewAction(rowAction.data);
        }
    }

    onRowClicked(clickedAssignment: EntityAssignmentResponse<T>): void {
        this.selectedParentId = clickedAssignment.id;
        this.selectedParent = clickedAssignment;

        const params = {
            parent: this.selectedParentId,
            search: this.filter.searchQuery
        };

        this.updateRouterParams(params);

        setTimeout(() => {
            this.childAssignmentListComponent.filter.parentAssignmentId = clickedAssignment.id;
            this.childAssignmentListComponent.loadData();
        });
    }

    onAssignDrawerDismiss(reload: boolean): void {
        this.assignDrawer.close();
        if (reload) {
            this.childAssignmentListComponent.loadData();
        }
    }

    onViewAssignmentDrawerDismiss(reload: boolean): void {
        this.viewAssignmentDrawer.close();
        if (reload) {
            this.childAssignmentListComponent.loadData();
        }
    }

    protected updateRouterParams(params: any): void {
        this.assignmentServiceWrapper.router.navigate([], {
            relativeTo: this.assignmentServiceWrapper.activatedRoute,
            queryParams: params
        });
    }

    protected executeViewAction(data: any): void {
        this.selectedChild = data;
        this.viewAssignmentContent.reset();
        this.viewAssignmentDrawer.open();
    }

    protected executeAssignAction(): void {
        if (this.selectedParentId) {
            this.assignContent.reset();
            this.assignDrawer.open();
        } else {
            this.assignmentServiceWrapper.gearsAlertService.showErrorAlert(translate('message.assignment.selectParentToAssign', {
                parent: translate('component.' + this.getParentComponent()),
                child: translate('component.' + this.getChildComponent())
            }));
        }
    }

    protected createBreadcrumbItems(): BreadcrumbItem[] {
        return [
            {label: 'component.assignment'},
            {label: 'component.' + this.getChildComponent()}
        ];
    }

    protected abstract getParentComponent(): string;

    protected abstract getParentComponentPlural(): string;

    protected abstract getChildComponent(): string;

    protected abstract getChildComponentPlural(): string;
}
