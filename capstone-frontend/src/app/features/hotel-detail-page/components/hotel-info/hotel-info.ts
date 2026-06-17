import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Hotel } from '../../../../core/services/hotel-service/hotel-service';
import { FallbackPipe } from '../../../../shared/pipes/fallback-pipe-pipe';

@Component({
  selector: 'app-hotel-info',
  standalone: true,
  imports: [MatIconModule, FallbackPipe],
  templateUrl: './hotel-info.html',
  styleUrl: './hotel-info.scss'
})
export class HotelInfo {
  @Input({ required: true }) hotel!: Hotel;

  get starsArray(): number[] {
    return Array(this.hotel.starRating).fill(0);
  }
}
