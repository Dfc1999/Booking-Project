import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './card-hotel.html',
  styleUrls: ['./card-hotel.scss'],
})
export class HotelCard {
  @Input() name = '';
  @Input() location = '';
  @Input() imageUrl = '';
  @Input() rating = 0;
  @Input() id = '';

  constructor(private router: Router) {}


  get stars() {
    return Array(Math.round(this.rating));
  }

  onBooking() {
    this.router.navigate(['/hotel', this.id]);
  }
}

