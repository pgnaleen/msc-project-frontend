import {Component, Input, OnInit} from '@angular/core';
import {IconLib} from '@gears-commons/types/icon-lib';
import {ControlValueAccessor} from '@angular/forms';

@Component({
    selector: 'gears-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss']
})
export class IconComponent implements ControlValueAccessor, OnInit {

    @Input()
    iconLib: IconLib = 'mat';

    @Input()
    icon: string;

    @Input()
    className = 'icon-size-5';

    constructor() {
    }

    writeValue(obj: any): void {

    }

    registerOnChange(fn: any): void {

    }

    registerOnTouched(fn: any): void {

    }

    setDisabledState?(isDisabled: boolean): void {

    }

    ngOnInit(): void {
    }

}
