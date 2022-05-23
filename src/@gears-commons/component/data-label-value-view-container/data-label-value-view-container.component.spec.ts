import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLabelValueViewContainerComponent } from './data-label-value-view-container.component';

describe('DataLabelValueViewContainerComponent', () => {
  let component: DataLabelValueViewContainerComponent;
  let fixture: ComponentFixture<DataLabelValueViewContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataLabelValueViewContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataLabelValueViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
