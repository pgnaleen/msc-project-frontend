import { Component, OnInit } from '@angular/core';
import {BaseButtonComponent} from '@gears-commons/component/buttons/button/base-button';

@Component({
  selector: 'sis-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent extends BaseButtonComponent implements OnInit {

  ngOnInit(): void {
  }
}
