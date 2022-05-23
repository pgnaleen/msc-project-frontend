import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLabelValueViewItemComponent } from './data-label-value-view-item.component';

describe('DataLabelValueViewItemComponent', () => {
  let component: DataLabelValueViewItemComponent;
  let fixture: ComponentFixture<DataLabelValueViewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataLabelValueViewItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLabelValueViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
