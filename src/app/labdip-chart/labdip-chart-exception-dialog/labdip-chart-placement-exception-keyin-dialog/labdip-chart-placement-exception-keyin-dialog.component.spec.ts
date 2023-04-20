import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabdipChartExceptionKeyinDialogComponent } from './labdip-chart-placement-keyin-dialog.component';

describe('LabdipChartKeyinDialogComponent', () => {
  let component: LabdipChartExceptionKeyinDialogComponent;
  let fixture: ComponentFixture<LabdipChartExceptionKeyinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabdipChartExceptionKeyinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdipChartExceptionKeyinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
