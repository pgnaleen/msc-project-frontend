import { Component, OnInit } from '@angular/core';
import {BaseButtonComponent} from '@gears-commons/component/buttons/button/base-button';

@Component({
  selector: 'sis-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent extends BaseButtonComponent implements OnInit {

  ngOnInit(): void {
  }

}
