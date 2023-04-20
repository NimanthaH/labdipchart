import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabdipChartKeyinDialogComponent } from './labdip-chart-keyin-dialog.component';

describe('LabdipChartKeyinDialogComponent', () => {
  let component: LabdipChartKeyinDialogComponent;
  let fixture: ComponentFixture<LabdipChartKeyinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabdipChartKeyinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdipChartKeyinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
