import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureColumnsComponent } from './configure-columns.component';

describe('ConfigureColumnsComponent', () => {
  let component: ConfigureColumnsComponent;
  let fixture: ComponentFixture<ConfigureColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
