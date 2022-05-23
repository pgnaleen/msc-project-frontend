import {Component, Input, OnInit} from '@angular/core';
import {Customizable} from '@gears-commons/models';
import {BaseDataTableComponent} from '@gears-commons/component/data-table/base-data-table';

@Component({
    selector: 'gears-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent extends BaseDataTableComponent implements OnInit {

    @Input()
    dataSource: Customizable[] = [];

    ngOnInit(): void {
    }
}
