import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'gears-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    styleUrls: ['./dialog-footer.component.scss']
})
export class DialogFooterComponent implements OnInit {

    @HostBinding('class')
    public class = 'overflow-y-visible';

    constructor() {
    }

    ngOnInit(): void {
    }

}
