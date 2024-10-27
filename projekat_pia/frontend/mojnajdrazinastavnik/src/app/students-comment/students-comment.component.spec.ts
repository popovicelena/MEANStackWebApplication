import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCommentComponent } from './students-comment.component';

describe('StudentsCommentComponent', () => {
  let component: StudentsCommentComponent;
  let fixture: ComponentFixture<StudentsCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsCommentComponent]
    });
    fixture = TestBed.createComponent(StudentsCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
