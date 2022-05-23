import {Component, Input, OnInit} from '@angular/core';
import {DataType, FormHeader} from '@gears-commons/models';
import {DataTypeUtils} from '@gears-commons/utils';
import {BaseInputComponent} from '@gears-commons/component/inputs/base-input-component';
import {IconLib} from '@gears-commons/types/icon-lib';
import {Direction} from '@angular/cdk/bidi/directionality';

@Component({
    selector: 'gears-number-input',
    templateUrl: './number-input.component.html',
    styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent extends BaseInputComponent implements OnInit {

    @Input()
    htmlDataType = 'number';

    @Input()
    iconLib: IconLib = 'mat';

    @Input()
    icon: string;

    @Input()
    textDirection: Direction = 'ltr';

    businessDataType: DataType = 'NUMBER_DECIMAL' || 'NUMBER_INTEGER';

    @Input()
    set dataType(dataType: DataType) {
        this.businessDataType = dataType;
        this.htmlDataType = DataTypeUtils.getHtmlDataType(dataType);
    }

    @Input()
    set header(header: FormHeader) {
        this.headerVal = header;
        this.dataType = header.dataType;
        this.key = header.key;
        this.validations = header.validations;
    }

    ngOnInit(): void {
    }
}
