import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BookingService, Booking } from '../../core/services/booking-service/booking-service';
import { ConfirmationMessageComponent } from '../../shared/components/confirmation-message-component/confirmation-message-component';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule, ConfirmationMessageComponent],
  templateUrl: './booking-page.html',
  styleUrls: ['./booking-page.scss']
})
export class BookingPage implements OnInit {
  bookings: Booking[] = [];
  loading = true;

  confirmationData: { message: string, type: 'success' | 'error' } | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.bookings = res;
        this.loading = false;
      },
      error: (err) => {
        this.confirmationData = { message: err.error?.message || 'Error loading bookings', type: 'error' };
        this.loading = false;
      }
    });
  }

  attemptCancelBooking(id: string | undefined) {
    if (!id) return;

    this.bookingService.cancelBooking(id).subscribe({
      next: () => {
        this.bookings = this.bookings.map(b =>
          b._id === id ? { ...b, status: 'cancelled' } : b
        );
        this.confirmationData = { message: 'Booking cancelled successfully', type: 'success' };
      },
      error: (err) => {
        this.confirmationData = { message: err.error?.message || 'Error cancelling booking', type: 'error' };
      }
    });
  }

  closeConfirmation() {
    this.confirmationData = null;
  }
}
