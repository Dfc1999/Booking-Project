import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BookingService, BookingPayload } from '../../../../core/services/booking-service/booking-service';
import { ConfirmationMessageComponent } from '../../../../shared/components/confirmation-message-component/confirmation-message-component';
import { UserService } from '../../../../core/services/user-service/user-service'; // Asegúrate que la ruta sea correcta

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, ConfirmationMessageComponent
  ],
  templateUrl: './booking-form-component.html',
  styleUrls: ['./booking-form-component.scss']
})
export class BookingFormComponent implements OnInit {

  @Input() hotelId!: string;
  @Input() roomIds: string[] = [];
  @Input() guests: number = 1;
  @Input() checkIn: Date | null | undefined;
  @Input() checkOut: Date | null | undefined;

  @Output() bookingCompleted = new EventEmitter<void>();
  @Output() bookingCancelled = new EventEmitter<void>();

  private bookingService = inject(BookingService);
  private userService = inject(UserService);
  
  bookingForm!: FormGroup;
  confirmationData: { message: string, type: 'success' | 'error' } | null = null;

  ngOnInit() {
    // 1. Creamos el formulario con los nuevos campos
    this.bookingForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?\d{7,15}$/)])
    });

    // 2. Hacemos la llamada para autocompletar los datos
    this.userService.getUserInfo().subscribe({
      next: (response) => {
        const user = response.user;
        this.bookingForm.patchValue({
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email
        });
      },
      error: (err) => console.error('Could not fetch user info', err)
    });
  }

  onSubmit() {
    if (!this.hotelId || !this.checkIn || !this.checkOut || this.bookingForm.invalid) return;

    const formValue = this.bookingForm.value;
    const bookingData: BookingPayload = {
      hotelId: this.hotelId,
      checkInDate: this.checkIn.toISOString(),
      checkOutDate: this.checkOut.toISOString(),
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
      email: formValue.email!,
      phone: formValue.phone!,
      roomIds: this.roomIds,
      guests: this.guests
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: () => this.confirmationData = { message: 'Booking confirmed successfully!', type: 'success' },
      error: (err) => this.confirmationData = { message: 'Booking failed: ' + (err.error?.message || 'Unknown error'), type: 'error' }
    });
  }

  onCancel() {
    this.bookingCancelled.emit();
  }

  closeConfirmation() {
    if (this.confirmationData?.type === 'success') {
      this.bookingCompleted.emit();
    }
    this.confirmationData = null;
  }
}