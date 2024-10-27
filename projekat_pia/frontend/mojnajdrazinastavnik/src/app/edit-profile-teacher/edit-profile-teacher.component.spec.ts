import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileTeacherComponent } from './edit-profile-teacher.component';

describe('EditProfileTeacherComponent', () => {
  let component: EditProfileTeacherComponent;
  let fixture: ComponentFixture<EditProfileTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileTeacherComponent]
    });
    fixture = TestBed.createComponent(EditProfileTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
