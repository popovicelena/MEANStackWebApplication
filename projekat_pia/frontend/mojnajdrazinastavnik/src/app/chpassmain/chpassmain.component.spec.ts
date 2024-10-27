import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChpassmainComponent } from './chpassmain.component';

describe('ChpassmainComponent', () => {
  let component: ChpassmainComponent;
  let fixture: ComponentFixture<ChpassmainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChpassmainComponent]
    });
    fixture = TestBed.createComponent(ChpassmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
