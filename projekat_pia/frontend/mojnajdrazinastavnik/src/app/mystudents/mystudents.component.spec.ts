import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MystudentsComponent } from './mystudents.component';

describe('MystudentsComponent', () => {
  let component: MystudentsComponent;
  let fixture: ComponentFixture<MystudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MystudentsComponent]
    });
    fixture = TestBed.createComponent(MystudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
