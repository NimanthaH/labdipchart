import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadShadeChildTableComponent } from './thread-shade-child-table.component';

describe('ThreadShadeChildTableComponent', () => {
  let component: ThreadShadeChildTableComponent;
  let fixture: ComponentFixture<ThreadShadeChildTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadShadeChildTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadShadeChildTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
