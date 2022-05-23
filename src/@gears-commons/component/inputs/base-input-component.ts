import {FormHeader, Validation} from '@gears-commons/models';
import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    template: ''
})
export abstract class BaseInputComponent {

    @Input()
    title;

    @Input()
    value;

    @Input()
    initialValue;

    @Input()
    translationScope: string;

    @Input()
    readOnly = false;

    @Input()
    key: string;

    @Input()
    formGroup: FormGroup;

    @Input()
    validations: Validation;

    headerVal: FormHeader;

    get translationLabel(): string {
        return this.headerVal ? this.headerVal.label ? this.headerVal.label : this.headerVal.key : this.key;
    }

    get validationsVal(): Validation {
        return this.headerVal?.validations ? this.headerVal.validations : this.validations;
    }

    @Input()
    set header(header: FormHeader) {
        this.headerVal = header;
        this.key = header.key;
        this.validations = header.validations;
    }
}
