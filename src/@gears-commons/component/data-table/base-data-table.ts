import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BaseFilter, FormHeader, MenuItem, ResponseMetaData} from '@gears-commons/models';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort/sort';
import {CommonEvents} from '@gears-commons/utils/common-events';
import {Direction} from '@angular/cdk/bidi/directionality';

@Component({
    template: ''
})
export abstract class BaseDataTableComponent {

    @Input()
    filter: BaseFilter = {};

    @Input()
    component: string;

    @Input()
    paginationMetaData: ResponseMetaData = new ResponseMetaData();

    @Output()
    actionPicked: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    filterChange = new EventEmitter<BaseFilter>();

    @Input()
    loading = true;

    @Input()
    overriddenValues;

    @Input()
    selectedItemId;

    @Input()
    rowClickable = false;

    @Output()
    rowClicked: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    actions: MenuItem[];

    headersList: FormHeader[] = [];
    displayHeadersList: FormHeader[] = [];
    displayedColumns: string[] = [];

    actionColumnWidthPercentage = 5;

    layoutDirection: Direction = 'ltr';

    public constructor() {
        window.addEventListener(CommonEvents.LANGUAGE_CHANGED, (event: CustomEvent) => {
            this.layoutDirection = event.detail?.language?.rtl ? 'rtl' : 'ltr';
        });
    }

    @Input()
    set headers(headers: FormHeader[]) {
        if (headers.length === 0) {
            return;
        }

        this.headersList = headers;
        this.displayHeadersList = headers.filter(header => header.displayParameters?.isVisibleInTable);
        this.displayHeadersList = this.displayHeadersList.sort((a, b) => a.sortOrder > b.sortOrder ? 1 : -1);
        this.displayedColumns = this.displayHeadersList.map(header => header.key);

        // todo: need to add a flag to filter visible fields.
        // this.displayedColumns = headers.filter(value => value.active).map(value => value.key);

        if (this.actions && this.actions.length > 0 && this.displayedColumns && !this.displayedColumns.includes('actions')) {
            this.displayedColumns.push('actions');
        }

        this.calculateWidthPercentages();
    }

    calculateWidthPercentages(): void {
        if (this.displayHeadersList == null || this.displayHeadersList.length === 0) {
            return;
        }

        const totalWeight = this.displayHeadersList
            .reduce((previousValue, currentValue) =>
                previousValue + (currentValue.displayParameters != null &&
                currentValue.displayParameters.tableColumnWeight > 0 ?
                    currentValue.displayParameters.tableColumnWeight : 1), 0);

        const basePercentage = this.actions && this.actions.length > 0 ? 95 : 100;
        const weightFactor = basePercentage / totalWeight;

        this.displayHeadersList.forEach(header => {
            header.widthPercentage = header.displayParameters.tableColumnWeight * weightFactor;
        });
    }

    sortHeaderClicked(event: Sort): void {
        if (event.direction === '') {
            this.filter.sortBy = null;
            this.filter.sortDirection = null;
        } else {
            this.filter.sortBy = [event.active];
            this.filter.sortDirection = event.direction === 'desc' ? 'DESC' : 'ASC';
        }

        this.filter.pageNo = 0;

        this.filterChange.emit(this.filter);
    }

    onPageChange(pageEvent: PageEvent): void {
        this.loading = true;
        this.filter.pageNo = pageEvent.pageIndex;
        this.filter.pageSize = pageEvent.pageSize;

        this.filterChange.emit(this.filter);
    }

    trackByFn(index: number, item: any): any {
        return item?.id || index;
    }
}
