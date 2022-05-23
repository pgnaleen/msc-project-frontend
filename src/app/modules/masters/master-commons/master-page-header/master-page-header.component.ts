import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BasePageHeaderComponent} from '@gears-commons/utils/base-page-header';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'sis-master-page-header',
    templateUrl: './master-page-header.component.html',
    styleUrls: ['./master-page-header.component.scss'],
    animations : fuseAnimations
})
export class MasterPageHeaderComponent extends BasePageHeaderComponent implements OnInit {

    @Input()
    component: string;

    @Input()
    assignButtonVisible = true;

    @Input()
    addButtonVisible = true;

    @Output()
    addButtonClicked: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    @Output()
    assignButtonClicked: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    ngOnInit(): void {
    }
}
