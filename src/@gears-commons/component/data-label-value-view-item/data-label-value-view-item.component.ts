import { Component, Input, OnInit } from '@angular/core';
import { Customizable, DataType, FormHeader } from '@gears-commons/models';

@Component({
    selector: 'gears-data-label-value-view-item',
    templateUrl: './data-label-value-view-item.component.html',
    styleUrls: ['./data-label-value-view-item.component.scss']
})
export class DataLabelValueViewItemComponent implements OnInit {

    @Input()
    key: string = '';

    @Input()
    value: any;

    @Input()
    translationScope: string;

    @Input()
    dataType: DataType = 'TEXT';

    headerValue: FormHeader;

    @Input()
    set header(header: FormHeader) {
        this.key = header.key;
        this.headerValue = header;
        this.dataType = header.dataType;
    }

    ngOnInit(): void {

    }

}
