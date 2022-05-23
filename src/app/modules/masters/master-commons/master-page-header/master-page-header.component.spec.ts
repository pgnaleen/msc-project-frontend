import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPageHeaderComponent } from './master-page-header.component';

describe('MasterPageHeaderComponent', () => {
  let component: MasterPageHeaderComponent;
  let fixture: ComponentFixture<MasterPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
