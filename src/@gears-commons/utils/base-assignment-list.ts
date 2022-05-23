import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {
    BaseFilter,
    Customizable,
    FormHeader,
    FormStructureResponse,
    MenuItem,
    Response,
    ResponseMetaData,
    TableRowAction
} from '@gears-commons/models';
import {EntityAssignmentFilter} from '@gears-commons/models/entity-assignment-filter';
import {EntityAssignmentResponse} from '@gears-commons/models/entity-assignment-response';
import {AssignmentServiceWrapper} from '@shared/services/assignment-service-wrapper';
import {TranslationHandler} from '../../app/core/transloco/translation-handler';
import {CommonEvents} from '@gears-commons/utils/common-events';

@Component({
    template: ''
})
export abstract class BaseAssignmentListComponent<T extends Customizable> implements AfterContentInit {

    @Input()
    baseEntity: string;

    @Input()
    visible = true;

    @Input()
    assignedEntity: string;

    @Input()
    formDescriptor: string;

    @Input()
    actions: MenuItem[];

    @Input()
    selectedItemId;

    @Input()
    rowClickable = false;

    @Input()
    loading = true;

    @Input()
    filter: EntityAssignmentFilter = new EntityAssignmentFilter();

    @Output()
    loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    rowClicked: EventEmitter<EntityAssignmentResponse<T>> = new EventEmitter<EntityAssignmentResponse<T>>();

    @Output()
    actionPicked: EventEmitter<TableRowAction> = new EventEmitter<TableRowAction>();

    assignmentsList: EntityAssignmentResponse<T>[] = [];
    headers: FormHeader[] = [];

    metaData: ResponseMetaData = new ResponseMetaData();

    component: string;

    isSecondaryLanguage: boolean;

    protected constructor(protected assignmentServiceWrapper: AssignmentServiceWrapper<T>) {
        this.isSecondaryLanguage = TranslationHandler.getCurrentLanguage()?.level === 2;
        window.addEventListener(CommonEvents.LANGUAGE_CHANGED, (event: CustomEvent) => {
            this.isSecondaryLanguage = event?.detail?.language?.level === 2;
        });
    }

    public getFilter(): EntityAssignmentFilter {
        return this.filter;
    }

    ngAfterContentInit(): void {
        this.component = this.getComponent();
        this.loadHeaders();
    }

    public loadData(): void {
        this.loading = true;
        this.setContextVariablesToFilter();
        this.assignmentServiceWrapper.entityAssignmentService
            .getAssignments({...this.filter, baseEntity: this.baseEntity})
            .subscribe({
                next: response => {
                    this.onDataLoaded(response);
                }, error: error => {
                    this.assignmentServiceWrapper.gearsAlertService.onError(error, this.component);
                }
            });
    }

    public setContextVariablesToFilter(): void {
        this.filter.contextAssignmentId = this.assignmentServiceWrapper.contextService.getSelectedChildId();
    }

    public loadHeaders(): void {
        if (this.formDescriptor == null) {
            return;
        }

        this.assignmentServiceWrapper.formService.getFormByDescriptor(this.formDescriptor).subscribe({
            next: response => {
                this.onHeadersLoaded(response);
            }, error: error => {
                this.assignmentServiceWrapper.gearsAlertService.onError(error, this.component);
            }
        });
    }

    public onFilterChanged(filter?: BaseFilter): void {
        this.loadData();
    }

    public onActionPicked(rowAction: TableRowAction): void {
        if (rowAction.action === 'view' || rowAction.action === 'edit') {
            this.actionPicked.emit(rowAction);
        } else if (rowAction.action === 'delete') {
            this.showDeleteDialog(rowAction.data);
        }
    }

    public showDeleteDialog(rowData: any): void {
        const dialogRef = this.assignmentServiceWrapper.gearsDialogService.openDeleteDialog(this.component);

        dialogRef.afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this.assignmentServiceWrapper.entityAssignmentService.removeAssignment([rowData.id]).subscribe({
                    next: response => {
                        this.assignmentServiceWrapper.gearsAlertService.showDeleteSuccessAlert(this.component);
                        this.onDataDeleted(rowData);
                        if (this.assignmentsList?.length === 1 && this.filter.pageNo > 0) {
                            this.filter.pageNo--;
                        }
                        this.loadData();
                    }, error: error => {
                        this.assignmentServiceWrapper.gearsAlertService.onError(error, this.component);
                    }
                });
            }
        });
    }

    protected onDataLoaded(response: Response<EntityAssignmentResponse<T>[]>): void {
        this.assignmentsList = response.payload;
        this.loading = false;
        this.loadingChange.emit(false);
        this.metaData = response.metadata;
    }

    protected onHeadersLoaded(response: Response<FormStructureResponse>): void {
        this.headers = response.payload.headers;

        if (this.actions == null) {
            this.actions = this.createActions();
        }

        this.loadData();
    }

    protected createActions(): MenuItem[] {
        return [
            MenuItem.view(),
            MenuItem.delete()
        ];
    }

    protected onDataDeleted(deletedData: any): void {

    }

    protected abstract getComponent(): string;
}
