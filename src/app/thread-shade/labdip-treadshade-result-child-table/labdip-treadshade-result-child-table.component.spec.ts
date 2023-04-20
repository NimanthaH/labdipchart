import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabdipTreadshadeResultChildTableComponent } from './labdip-treadshade-result-child-table.component';

describe('LabdipTreadshadeResultChildTableComponent', () => {
  let component: LabdipTreadshadeResultChildTableComponent;
  let fixture: ComponentFixture<LabdipTreadshadeResultChildTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabdipTreadshadeResultChildTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabdipTreadshadeResultChildTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
