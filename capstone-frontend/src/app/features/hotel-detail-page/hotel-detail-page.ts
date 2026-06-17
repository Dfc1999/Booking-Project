import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HotelService, RoomSummary, DetailedRoom, Hotel } from '../../core/services/hotel-service/hotel-service';
import { BookingFormComponent } from './components/booking-form-component/booking-form-component';
import { Carousel } from '../../shared/components/carousel/carousel';
import { HotelInfo } from './components/hotel-info/hotel-info';
import { AvailabilityForm } from './components/availability-form/availability-form';
import { RoomAvailability } from './components/room-availability/room-availability';
import { BookingSummary } from './components/booking-summary/booking-summary';
import { take, forkJoin, finalize } from 'rxjs';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BookingFormComponent,
    Carousel, 
    HotelInfo, 
    AvailabilityForm, 
    RoomAvailability, 
    BookingSummary,
    HotelInfo,
    AvailabilityForm,
    RoomAvailability,
    BookingSummary
  ],
  templateUrl: './hotel-detail-page.html',
  styleUrls: ['./hotel-detail-page.scss'],
})
export class HotelDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);
  private fb = inject(FormBuilder);

  hotel = signal<Hotel | null>(null);
  roomSummary = signal<RoomSummary[]>([]);
  detailedRooms = signal<DetailedRoom[]>([]);
  selectedRoomType = signal<string | null>(null);
  isLoading = signal(true);

  guests = signal(1);
  selectedRoomIds = signal<string[]>([]);

  selectedRoomCount = computed(() => this.selectedRoomIds().length);

  showBookingForm = signal(false);

  
  dateForm = this.fb.group({
    checkIn: [null as Date | null, Validators.required],
    checkOut: [null as Date | null, Validators.required]
  });
  
  private hotelId!: string;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.hotelId = id;

    this.hotelService.filters$.pipe(take(1)).subscribe(filters => {
      const checkIn = filters?.checkIn ? new Date(filters.checkIn) : null;
      const checkOut = filters?.checkOut ? new Date(filters.checkOut) : null;
      this.guests.set(filters?.persons || 1);

      this.dateForm.patchValue({ checkIn, checkOut });
      this.loadHotelAndAvailability();
    });
  }

  loadHotelAndAvailability() {
    const { checkIn, checkOut } = this.dateForm.value;
    if (!this.dateForm.valid || !checkIn || !checkOut) {
        this.hotelService.getHotelById(this.hotelId).subscribe(hotel => this.hotel.set(hotel));
        this.roomSummary.set([]);
        this.isLoading.set(false);
        return;
    }
    
    this.isLoading.set(true);
    this.selectedRoomType.set(null);
    this.selectedRoomIds.set([]);
    this.showBookingForm.set(false);

    forkJoin({
        hotel: this.hotelService.getHotelById(this.hotelId),
        summary: this.hotelService.getAvailabilitySummary(this.hotelId, checkIn, checkOut)
    })
    .pipe(
        finalize(() => this.isLoading.set(false))
    )
    .subscribe({
        next: ({ hotel, summary }) => {
            this.hotel.set(hotel);
            this.roomSummary.set(summary);
        },
        error: err => {
            console.error('Error loading hotel and availability', err);
        }
    });
  }

  viewRoomDetails(roomType: string) {
    const { checkIn, checkOut } = this.dateForm.value;
    if (!this.dateForm.valid || !checkIn || !checkOut) return;

    this.isLoading.set(true);
    this.hotelService.getDetailedAvailableRooms(this.hotelId, roomType, checkIn, checkOut)
    .pipe(
        finalize(() => this.isLoading.set(false))
    )
    .subscribe({
      next: rooms => {
        this.detailedRooms.set(rooms);
        this.selectedRoomType.set(roomType);
      },
      error: err => console.error('Error loading detailed rooms', err)
    });
  }

  toggleRoomSelection(roomId: string) {
    this.selectedRoomIds.update(ids => 
      ids.includes(roomId) ? ids.filter(id => id !== roomId) : [...ids, roomId]
    );
  }

  isSelected(roomId: string): boolean {
    return this.selectedRoomIds().includes(roomId);
  }

  backToSummary() {
    this.selectedRoomType.set(null);
    this.detailedRooms.set([]);
  }

  onBookingCompleted() {
    this.showBookingForm.set(false);
    this.loadHotelAndAvailability();
  }
}
