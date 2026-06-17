import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:3000/hotels';

  private filtersSource = new BehaviorSubject<SearchFilters | null>(null);
  public filters$ = this.filtersSource.asObservable();

  constructor(private http: HttpClient) {}

  updateFilters(filters: SearchFilters) {
    this.filtersSource.next(filters);
  }

  clearFilters() {
    this.filtersSource.next(null);
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  getHotelById(id: string): Observable<Hotel> {
    return this.http.get<Hotel>(`${this.apiUrl}/${id}`);
  }

  getAvailabilitySummary(hotelId: string, checkIn: Date, checkOut: Date): Observable<RoomSummary[]> {
    const params = new HttpParams()
      .set('checkIn', checkIn.toISOString())
      .set('checkOut', checkOut.toISOString());
    return this.http.get<RoomSummary[]>(`${this.apiUrl}/${hotelId}/availability`, { params });
  }

  getDetailedAvailableRooms(hotelId: string, roomType: string, checkIn: Date, checkOut: Date): Observable<DetailedRoom[]> {
    const params = new HttpParams()
      .set('checkIn', checkIn.toISOString())
      .set('checkOut', checkOut.toISOString());
    return this.http.get<DetailedRoom[]>(`${this.apiUrl}/${hotelId}/availability/${roomType}`, { params });
  }

  searchHotels(filters: SearchFilters): Observable<HotelSearchResult[]> {
    let params = new HttpParams().set('persons', filters.persons.toString());
    
    if (filters.location) {
      params = params.set('location', filters.location);
    }
    if (filters.checkIn) {
      params = params.set('checkIn', filters.checkIn.toISOString());
    }
    if (filters.checkOut) {
      params = params.set('checkOut', filters.checkOut.toISOString());
    }

    return this.http.get<HotelSearchResult[]>(`${this.apiUrl}/search/rooms`, { params });
  }
}

export interface Hotel {
  _id: string;
  name: string;
  location: {
    country: string;
    city: string;
    province: string;
  };
  starRating: number;
  description: string;
  images: { url: string }[];
  amenities?: string[];
  rooms?: DetailedRoom[];
}

export interface RoomSummary {
  type: string;
  availableCount: number;
  price: number;
}

export interface DetailedRoom {
  _id: string;
  roomNumber: string;
  type: string;
  beds: number;
  capacity: number;
  price: number;
  description: string;
}

export interface SearchFilters {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
  persons: number;
}

export interface HotelSearchResult {
  hotelId: string;
  hotelName: string;
  hotelLocation: {
    city: string;
    province: string;
    country: string;
  };
  images: { url: string }[];
  starRating: number;
}