import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {BreadcrumbItem} from '@gears-commons/models/breadcrumb-item';
import {BaseFilter} from '@gears-commons/models';
import {FilterItem} from '@gears-commons/models/filter-item';

@Component({
    template: ''
})
export abstract class BasePageHeaderComponent {

    @HostBinding('class')
    class = 'w-full';

    @Input()
    filter: BaseFilter = {};

    @Input()
    filterItems: FilterItem[] = [];

    @Input()
    breadcrumbItems: BreadcrumbItem[];

    @Input()
    component: string;

    @Output()
    searchTextChange: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    filterChange = new EventEmitter<BaseFilter>();

    //Flag for open the Filter panel
    isOpenFilterPanel: boolean = false;

    onChangeFilterPanel(): void {
        this.isOpenFilterPanel = !this.isOpenFilterPanel;
    }

    onSearchTextChange(searchQuery: string): void {
        if (searchQuery === this.filter.searchQuery) {
            return;
        }

        this.filter.searchQuery = searchQuery;
        this.filter.pageNo = 0;
        this.filterChange.emit(this.filter);
    }
}
