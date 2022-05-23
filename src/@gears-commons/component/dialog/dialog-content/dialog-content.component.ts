import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'gears-dialog-content',
    templateUrl: './dialog-content.component.html',
    styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent implements OnInit {

    @HostBinding('class')
    public class = 'overflow-y-scroll';

    constructor() {
    }

    ngOnInit(): void {
    }

}
