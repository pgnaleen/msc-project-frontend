import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseFilter} from '@gears-commons/models';
import {TranslocoService} from '@ngneat/transloco';
import {FilterItem} from '@gears-commons/models/filter-item';

@Component({
    selector: 'gears-filter',
    templateUrl: './filter-component.html',
    styleUrls: ['./filter-component.scss']
})
export class MainFilterComponent implements OnInit {

    @Input()
    filter: BaseFilter = {};

    @Input()
    filterItems: FilterItem[] = [];

    @Output()
    filterChange = new EventEmitter<BaseFilter>();

    constructor(private _translocoService: TranslocoService) {
    }

    ngOnInit(): void {
    }

    onFilterValueChange(key: string, value: any): void {
        this.filter[key] = value;
        this.filterChange.emit(this.filter);
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
