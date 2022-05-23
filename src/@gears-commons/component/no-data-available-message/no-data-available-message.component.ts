import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'gears-no-data-available-message',
    templateUrl: './no-data-available-message.component.html',
    styleUrls: ['./no-data-available-message.component.scss']
})
export class NoDataAvailableMessageComponent implements OnInit {

    @Input()
    src = 'assets/images/placeholders/no_items.svg';

    @Input()
    message;

    constructor() {
    }

    ngOnInit(): void {
    }

}
