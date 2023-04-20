import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewUpdateDialogComponent } from './addnew-update-dialog.component';

describe('AddnewUpdateDialogComponent', () => {
  let component: AddnewUpdateDialogComponent;
  let fixture: ComponentFixture<AddnewUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddnewUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
