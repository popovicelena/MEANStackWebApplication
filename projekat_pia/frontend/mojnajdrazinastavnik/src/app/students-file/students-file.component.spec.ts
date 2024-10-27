import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsFileComponent } from './students-file.component';

describe('StudentsFileComponent', () => {
  let component: StudentsFileComponent;
  let fixture: ComponentFixture<StudentsFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsFileComponent]
    });
    fixture = TestBed.createComponent(StudentsFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
