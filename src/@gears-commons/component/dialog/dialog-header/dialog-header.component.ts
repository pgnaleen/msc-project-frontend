import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'gears-dialog-header',
    templateUrl: './dialog-header.component.html',
    styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent implements OnInit {

    @Input()
    title;

    constructor() {
    }

    ngOnInit(): void {
    }

}
