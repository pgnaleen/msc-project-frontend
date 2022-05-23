import {Component, Input, OnInit} from '@angular/core';
import {FormHeader} from '@gears-commons/models';
import {Customizable} from '@gears-commons/models';

@Component({
  selector: 'gears-custom-data-view',
  templateUrl: './custom-data-view.component.html',
  styleUrls: ['./custom-data-view.component.scss']
})
export class CustomDataViewComponent implements OnInit {

  @Input()
  header: FormHeader | undefined;

  @Input()
  data: Customizable | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  getCustomFieldValue(): string | null {
    const val = this.data?.customFields.find(value => value.key === this.header?.key);

    if (val == null) {
      return null;
    }

    return val.value;
  }
}
