import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DetailedRoom, RoomSummary } from '../../../../core/services/hotel-service/hotel-service';
import { CapitalizePipe } from '../../../../shared/pipes/capitalize-pipe-pipe';
import { PricePipe } from '../../../../shared/pipes/price-pipe-pipe';

@Component({
  selector: 'app-room-availability',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CapitalizePipe, PricePipe],
  templateUrl: './room-availability.html',
  styleUrl: './room-availability.scss'
})
export class RoomAvailability {
  @Input({ required: true }) isLoading!: Signal<boolean>;
  @Input({ required: true }) roomSummary!: Signal<RoomSummary[]>;
  @Input({ required: true }) detailedRooms!: Signal<DetailedRoom[]>;
  @Input({ required: true }) selectedRoomType!: Signal<string | null>;
  @Input({ required: true }) isRoomSelected!: (roomId: string) => boolean;

  @Output() viewDetails = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();
  @Output() toggleSelection = new EventEmitter<string>();
}
