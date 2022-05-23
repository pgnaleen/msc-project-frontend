import { Component, OnInit } from '@angular/core';
import {BaseButtonComponent} from '@gears-commons/component/buttons/button/base-button';

@Component({
  selector: 'sis-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent extends BaseButtonComponent implements OnInit {

  ngOnInit(): void {
  }

}
