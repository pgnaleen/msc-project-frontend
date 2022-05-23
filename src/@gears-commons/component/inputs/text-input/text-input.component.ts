import {Component, Input, OnInit} from '@angular/core';
import {DataType, FormHeader} from '@gears-commons/models';
import {DataTypeUtils} from '@gears-commons/utils';
import {BaseInputComponent} from '@gears-commons/component/inputs/base-input-component';
import {IconLib} from '@gears-commons/types/icon-lib';
import {Direction} from '@angular/cdk/bidi/directionality';

@Component({
    selector: 'gears-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent extends BaseInputComponent implements OnInit {

    @Input()
    elementType: 'input' | 'textarea' = 'input';

    @Input()
    htmlDataType = 'text';

    @Input()
    iconLib: IconLib = 'mat';

    @Input()
    icon: string;

    @Input()
    textDirection: Direction = 'ltr';

    businessDataType: DataType = 'TEXT';

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
