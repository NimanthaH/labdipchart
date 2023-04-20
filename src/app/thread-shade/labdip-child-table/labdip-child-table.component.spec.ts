import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabdipChildTableComponent } from './labdip-child-table.component';

describe('LabdipChildTableComponent', () => {
  let component: LabdipChildTableComponent;
  let fixture: ComponentFixture<LabdipChildTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabdipChildTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdipChildTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
