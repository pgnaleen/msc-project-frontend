import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Customizable, FormHeader} from '@gears-commons/models';
import {EntityAssignmentFilter} from '@gears-commons/models/entity-assignment-filter';
import {EntityAssignmentService, GearsAlertService} from '@gears-commons/services';
import {MasterService} from '@shared/services/master.service';
import {translate} from '@ngneat/transloco';
import {EntityAssignmentBulkRequest} from '@gears-commons/models/entity-assignment-bulk-request';
import {EntityAssignmentRequest} from '@gears-commons/models/entity-assignment-request';
import {AssignmentServiceWrapper} from '@shared/services/assignment-service-wrapper';

@Component({
    selector: 'sis-assign-component',
    templateUrl: './assign-component.component.html',
    styleUrls: ['./assign-component.component.scss']
})
export class AssignComponentComponent<T extends Customizable> implements OnInit {

    @Input()
    childComponent: string;

    @Input()
    parentComponent: string;

    @Input()
    selectorFieldLabel: string;

    @Input()
    parentDisplayValue: any;

    @Input()
    assignedChildObjList: any;

    @Input()
    parentId: number;

    @Input()
    baseEntity: string;

    @Input()
    displayTitleField: string;

    @Input()
    displayDescriptionField: string;

    @Output()
    dismiss: EventEmitter<boolean> = new EventEmitter<boolean>();

    public formGroup: FormGroup;
    headersMap: { [key: string]: FormHeader } = {};

    assignedChildList: any = [];
    unAssignedChildList: any = [];
    allChildList: any = [];  // get all child component list
    removedComponentList: any = [];

    newAssignedChildList: any[] = [];
    filter: EntityAssignmentFilter = new EntityAssignmentFilter();

    initiallyAssignedList: any = [];
    saveBtnDisable: boolean = true;
    component: string;

    constructor(private entityAssignmentService: EntityAssignmentService<any>,
                private gearsAlertService: GearsAlertService,
                private masterService: MasterService,
                protected assignmentServiceWrapper: AssignmentServiceWrapper<T>) {
    }

    ngOnInit(): void {
    }

    public confirmAndDismiss(): void {
        const dialogRef = this.assignmentServiceWrapper.gearsDialogService.openWarnDialog(
            translate('dialog.saveChanges.title'),
            translate('dialog.saveChanges.message'),
            'heroicons_outline:exclamation',
            translate('dialog.saveChanges.confirmAction'),
            translate('dialog.saveChanges.cancelAction'));

        dialogRef.afterClosed().subscribe(value => {
                    if (value === 'confirmed') {
                        this.save();
                    } else {
                        this.dismiss.emit(false);
                    }
            this.saveBtnDisable = true;
                });
    }

    public reset(): void {
        this.allChildList = [];
        this.assignedChildList = [];
        this.unAssignedChildList = [];
        this.removedComponentList = [];
        this.newAssignedChildList = [];

        this.getAssignedChildList();
    }

    // get all assigned child components
    getAssignedChildList(): void {
        this.entityAssignmentService.getAssignments({
            baseEntity: this.baseEntity,
            contextAssignmentId: null,
            parentAssignmentId: this.parentId
        })
            .subscribe(data => {
                this.assignedChildList = data.payload;
                this.getAllChildList();
            });
    }

    // get all child components
    getAllChildList(): void {
        this.masterService.getComponentListByBaseEntity(this.baseEntity,
            {contextAssignmentId: null})
            .subscribe(data => {
                this.allChildList = data.payload;

                // todo: remove this filter
                this.unAssignedChildList = this.allChildList.filter((page1: any) => page1.data != null && !this
                    .assignedChildList.find(page2 => page1.data?.structureMasterId === page2.data?.structureMasterId));
            });
    }

    isInInitialList(entity): any {
        return this.initiallyAssignedList.some((el: any) => el.id === entity.id);
    }

    // add new items for assign
    assignNewChild(event, entity, index): void {
        if (event.checked === true) {
            if (!this.isInInitialList(entity)) {  // no initial list
                this.newAssignedChildList.push(entity);
                this.saveBtnDisable = false;
            } else {
                this.removedComponentList.splice((this.removedComponentList).indexOf(entity.id), 1);
                if (this.removedComponentList.length === 0 && this.newAssignedChildList.length === 0) {
                    this.saveBtnDisable = true;
                }
            }

            this.assignedChildList.push(entity);
            this.unAssignedChildList.splice(index, 1);
        }
    }

    // check entity is newly add to chip
    isNewEntity(entity): any {
        return this.newAssignedChildList.some((el: any) => el.id === entity.id);
    }

    // remove assign items
    removeAssignedComponent(entity, index): void {
        this.assignedChildList.splice(index, 1);  // remove from chips
        this.unAssignedChildList.push(entity);

        if (!this.isNewEntity(entity)) { // is new entity = false (already assigned)
            if (!this.isInInitialList(entity)) {
                this.initiallyAssignedList.push(entity);
                this.removedComponentList.push(entity.id);
                this.saveBtnDisable = false;
            }
        } else {
            this.newAssignedChildList.splice((this.newAssignedChildList).indexOf(entity.id), 1);
            if (this.removedComponentList.length === 0 && this.newAssignedChildList.length === 0) {
                this.saveBtnDisable = true;
            }
        }
    }

    // assign and unassign component to parent
    save(): void {
        const assignments: EntityAssignmentRequest[] = this.newAssignedChildList.map(value => ({
            assignmentParentId: this.parentId,
            assignedEntityId: value.data.structureMasterId,
        } as EntityAssignmentRequest));

        const bulkUpdateReq: EntityAssignmentBulkRequest = {
            assignmentRequests: assignments,
            unAssignRequests: this.removedComponentList,
            contextAssignmentId: null
        };

        this.entityAssignmentService.bulkUpdateAssignment(bulkUpdateReq).subscribe({
            next: response => {
                this.gearsAlertService.showSuccessAlert(translate('message.assignment.componentAssignedSuccessfully',
                    {component: translate('component.' + this.childComponent)}));
                this.dismiss.emit(true);
            }, error: error => {
                this.gearsAlertService.onError(error, this.childComponent);
            }
        });
    }

    getFormGroup(): FormGroup {
        return this.formGroup;
    }
}
