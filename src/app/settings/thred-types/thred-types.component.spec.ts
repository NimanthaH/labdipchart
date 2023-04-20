import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThredTypesComponent } from './thred-types.component';

describe('ThredTypesComponent', () => {
  let component: ThredTypesComponent;
  let fixture: ComponentFixture<ThredTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThredTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThredTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
