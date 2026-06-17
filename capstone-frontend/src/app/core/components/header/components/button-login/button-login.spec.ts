import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLogin } from './button-login';

describe('ButtonLogin', () => {
  let component: ButtonLogin;
  let fixture: ComponentFixture<ButtonLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
