import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbItem} from '@gears-commons/models/breadcrumb-item';

@Component({
    selector: 'gears-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

    @Input()
    breadcrumbItems: BreadcrumbItem[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
