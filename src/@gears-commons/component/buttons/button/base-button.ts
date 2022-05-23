import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IconLib} from '@gears-commons/types/icon-lib';
import {ThemePalette} from '@angular/material/core/common-behaviors/color';

@Component({
    template: ''
})
export abstract class BaseButtonComponent {
    @Input()
    iconLib: IconLib = 'mat';

    @Input()
    icon: string;

    @Input()
    disabled = false;

    @Input()
    iconClass = 'icon-size-6';

    @Input()
    buttonClass = '';

    @Input()
    color: ThemePalette;

    @Input()
    type: 'raised' | 'stroked' | 'flat' | 'icon' | '' | undefined | null;

    @Output()
    buttonClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
