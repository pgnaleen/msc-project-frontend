import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {BreadcrumbItem} from '@gears-commons/models/breadcrumb-item';

@Component({
    selector: 'gears-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

    @HostBinding('class')
    classes = 'flex flex-col bg-card border-b px-6 py-2 sm:flex-row justify-between items-center flex-auto max-w-1 xs:flex-col sm:max-w-none';

    @Input()
    breadcrumbItems: BreadcrumbItem[];

    @Input()
    title: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
