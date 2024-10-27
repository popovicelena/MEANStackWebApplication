import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijanastavnikComponent } from './registracijanastavnik.component';

describe('RegistracijanastavnikComponent', () => {
  let component: RegistracijanastavnikComponent;
  let fixture: ComponentFixture<RegistracijanastavnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijanastavnikComponent]
    });
    fixture = TestBed.createComponent(RegistracijanastavnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
