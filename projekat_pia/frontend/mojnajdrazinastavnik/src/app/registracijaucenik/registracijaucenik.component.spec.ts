import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaucenikComponent } from './registracijaucenik.component';

describe('RegistracijaucenikComponent', () => {
  let component: RegistracijaucenikComponent;
  let fixture: ComponentFixture<RegistracijaucenikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaucenikComponent]
    });
    fixture = TestBed.createComponent(RegistracijaucenikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
