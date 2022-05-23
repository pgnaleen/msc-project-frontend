import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
    selector: 'gears-page-container',
    templateUrl: './page-container.component.html',
    styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnInit {

    @HostBinding('class')
    classes = 'flex flex-col flex-auto w-full';

    constructor() {
    }

    ngOnInit(): void {
    }

}
