import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBooking } from './button-booking';

describe('ButtonBooking', () => {
  let component: ButtonBooking;
  let fixture: ComponentFixture<ButtonBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
