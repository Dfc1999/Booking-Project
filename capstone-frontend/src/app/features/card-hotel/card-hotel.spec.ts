import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCard } from './card-hotel';

describe('HotelCard', () => {
  let component: HotelCard;
  let fixture: ComponentFixture<HotelCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
