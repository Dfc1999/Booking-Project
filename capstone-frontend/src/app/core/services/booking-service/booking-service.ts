import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: BookingPayload): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  cancelBooking(id: string): Observable<Booking> {
    return this.http.delete<Booking>(`${this.apiUrl}/${id}`);
  }
}

export interface Booking {
  _id: string;
  hotelId: string;
  guestId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  checkInDate: string | Date;
  checkOutDate: string | Date;
  rooms: string[];
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
  createdAt: string | Date;
  cancelledAt?: string | Date;
}

export interface BookingPayload {
  hotelId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  roomIds: string[];
  checkInDate: Date | string;
  checkOutDate: Date | string;
  guests: number;
}