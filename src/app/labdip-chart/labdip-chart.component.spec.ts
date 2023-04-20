import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabdipChartComponent } from './labdip-chart.component';

describe('LabdipChartComponent', () => {
  let component: LabdipChartComponent;
  let fixture: ComponentFixture<LabdipChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabdipChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdipChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
