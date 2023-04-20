import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabdipChartExceptioninDialogComponent } from './labdip-chart-exception-dialogcomponent';

describe('LabdipChartKeyinDialogComponent', () => {
  let component: LabdipChartExceptioninDialogComponent;
  let fixture: ComponentFixture<LabdipChartExceptioninDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabdipChartExceptioninDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdipChartExceptioninDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
