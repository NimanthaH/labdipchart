import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadShadeComponent } from './thread-shade.component';

describe('ThreadShadeComponent', () => {
  let component: ThreadShadeComponent;
  let fixture: ComponentFixture<ThreadShadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadShadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadShadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
