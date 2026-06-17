import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelInfo } from './hotel-info';

describe('HotelInfo', () => {
  let component: HotelInfo;
  let fixture: ComponentFixture<HotelInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
