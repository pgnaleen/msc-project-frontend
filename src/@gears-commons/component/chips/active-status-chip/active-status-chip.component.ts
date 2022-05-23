import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'gears-active-status-chip',
    templateUrl: './active-status-chip.component.html',
    styleUrls: ['./active-status-chip.component.scss']
})
export class ActiveStatusChipComponent implements OnInit {

    @Input()
    active = true;

    constructor() {
    }

    ngOnInit(): void {
    }

}
