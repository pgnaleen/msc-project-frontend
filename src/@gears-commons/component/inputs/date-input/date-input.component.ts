import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormHeader, Validation} from '@gears-commons/models';
import {BaseInputComponent} from '@gears-commons/component/inputs/base-input-component';

@Component({
    selector: 'gears-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss']
})
export class DateInputComponent extends BaseInputComponent implements OnInit {

    ngOnInit(): void {
    }
}
