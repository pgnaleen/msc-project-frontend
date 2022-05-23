import { Component, OnInit } from '@angular/core';
import {BaseButtonComponent} from '@gears-commons/component/buttons/button/base-button';

@Component({
  selector: 'sis-ok-button',
  templateUrl: './ok-button.component.html',
  styleUrls: ['./ok-button.component.scss']
})
export class OkButtonComponent extends BaseButtonComponent implements OnInit {

  ngOnInit(): void {
  }

}
