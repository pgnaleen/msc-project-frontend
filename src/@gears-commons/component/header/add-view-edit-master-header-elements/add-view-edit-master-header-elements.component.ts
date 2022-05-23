import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActionMode} from '@gears-commons/types/action-mode';

@Component({
    selector: 'gears-add-view-edit-master-header-elements',
    templateUrl: './add-view-edit-master-header-elements.component.html',
    styleUrls: ['./add-view-edit-master-header-elements.component.scss']
})
export class AddViewEditMasterHeaderElementsComponent implements OnInit {

    @Input()
    mode: ActionMode;

    @Input()
    loading = true;

    @Input()
    activeStatus = true;

    @Output()
    activeStatusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output()
    switchToEditMode: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    dismissButtonClicked: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    submitButtonCLicked: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
    }

}
