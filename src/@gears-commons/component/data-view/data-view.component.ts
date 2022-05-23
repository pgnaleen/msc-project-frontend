import {Component, Input, OnInit} from '@angular/core';
import {DataType} from '@gears-commons/models';

@Component({
  selector: 'gears-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.scss']
})
export class DataViewComponent implements OnInit {

  @Input()
  dataType: DataType = 'TEXT';

  @Input()
  value: string | null | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  getUrl(): string {
    if (this.value == null) {
      return '#';
    }

    if (this.value.startsWith('http')) {
      return this.value;
    }

    return 'https://' + this.value;
  }
}
