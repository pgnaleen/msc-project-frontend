import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseInputComponent} from '@gears-commons/component/inputs/base-input-component';
import {CommonEvents} from '@gears-commons/utils/common-events';
import {TranslationHandler} from '../../../../app/core/transloco/translation-handler';

@Component({
    selector: 'gears-select-input',
    templateUrl: './select-input.component.html',
    styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent extends BaseInputComponent implements OnInit {

    @Input()
    valueField;

    @Input()
    displayField;

    @Input()
    displayField2L;

    @Input()
    isLookup = false;

    @Input()
    displayFn;

    @Input()
    translatable: boolean;

    @Input()
    placeholder: string;

    @Output()
    selectionChange: EventEmitter<any> = new EventEmitter<any>(); // This is for master-header component event

    selectedDisplayValue;

    optionValues: any[];

    isSecondaryLanguage: boolean;

    @Input()
    set options(options: any[]) {
        this.optionValues = options;

        if (options) {
            this.initSelectedValue();
        }
    };

    ngOnInit(): void {
        this.isSecondaryLanguage = TranslationHandler.getCurrentLanguage()?.level === 2;
        window.addEventListener(CommonEvents.LANGUAGE_CHANGED, (event: CustomEvent) => {
            this.isSecondaryLanguage = event?.detail?.language?.level === 2;
            this.initSelectedValue();
        });
    }

    //This event trigger when active status drop down option value change
    onSelectionChange(value: any): void {
        this.selectionChange.emit(value);
    }

    private initSelectedValue(): void {

        let selectedItem;
        if (this.formGroup) {
            selectedItem = this.optionValues?.find(value => value[this.valueField] === this.formGroup?.get(this.key)?.value);
        } else {
            selectedItem = this.optionValues?.find(value => value[this.valueField] === this.initialValue);
        }

        if (!selectedItem) {
            return;
        }

        if (this.isLookup) {
            this.selectedDisplayValue = this.isSecondaryLanguage ? selectedItem['name2L'] : selectedItem['name'];
        } else if (this.displayField != null) {
            if (!selectedItem.hasOwnProperty(this.displayField)) {
                this.selectedDisplayValue = '';
                return;
            }

            this.selectedDisplayValue = selectedItem[this.displayField];
        } else {
            this.selectedDisplayValue = this.displayFn ? this.displayFn(selectedItem) : null;
        }
    }
}
