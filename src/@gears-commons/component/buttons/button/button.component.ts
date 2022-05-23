import {Component, OnInit} from '@angular/core';
import {BaseButtonComponent} from '@gears-commons/component/buttons/button/base-button';

@Component({
    selector: 'gears-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends BaseButtonComponent implements OnInit {

    ngOnInit(): void {
    }

}
