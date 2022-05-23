import { Component, OnInit } from '@angular/core';
import {BaseButtonComponent} from '@gears-commons/component/buttons/button/base-button';

@Component({
  selector: 'sis-assign-button',
  templateUrl: './assign-button.component.html',
  styleUrls: ['./assign-button.component.scss']
})
export class AssignButtonComponent extends BaseButtonComponent implements OnInit {

  ngOnInit(): void {
  }

}
