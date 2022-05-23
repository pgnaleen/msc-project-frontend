import {Component, Input, OnInit} from '@angular/core';
import {BaseDataTableComponent} from '@gears-commons/component/data-table/base-data-table';
import {EntityAssignmentResponse} from '@gears-commons/models/entity-assignment-response';

@Component({
    selector: 'gears-assignment-data-table',
    templateUrl: './assignment-data-table.component.html',
    styleUrls: ['./assignment-data-table.component.scss']
})
export class AssignmentDataTableComponent extends BaseDataTableComponent implements OnInit {

    dataSourceValue: EntityAssignmentResponse<any>[] = [];

    // todo: remove this filter
    @Input()
    set dataSource(dataSource: EntityAssignmentResponse<any>[]) {
        if (dataSource == null) {
            return;
        }

        this.dataSourceValue = dataSource.filter(value => value.data != null);
    }

    ngOnInit(): void {
    }

}
