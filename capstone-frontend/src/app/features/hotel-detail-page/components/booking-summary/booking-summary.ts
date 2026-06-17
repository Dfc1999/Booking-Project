import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './booking-summary.html',
  styleUrl: './booking-summary.scss'
})
export class BookingSummary {
  @Input({ required: true }) selectedRoomCount!: Signal<number>;
  @Output() proceed = new EventEmitter<void>();
}
