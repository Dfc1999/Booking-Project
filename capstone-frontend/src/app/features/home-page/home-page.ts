import { Component, OnDestroy, OnInit } from '@angular/core';
import { HotelService, Hotel, SearchFilters, HotelSearchResult } from '../../core/services/hotel-service/hotel-service';
import { HotelCard } from '../card-hotel/card-hotel';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { SearchBox } from '../search-box/search-box';
import { Carousel, CarouselImage } from '../../shared/components/carousel/carousel';

@Component({
  selector: 'app-home-page',
  imports: [
    HotelCard, 
    HttpClientModule, 
    SearchBox,
    Carousel
  ],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
  standalone: true
})
export class HomePage implements OnInit, OnDestroy {
  carouselImages: CarouselImage[] = [
    { url: 'https://placehold.co/1920x600/000000/FFFFFF?text=Luxury+Hotel' },
    { url: 'https://placehold.co/1920x600/333333/FFFFFF?text=City+View' },
    { url: 'https://placehold.co/1920x600/555555/FFFFFF?text=Tropical+Paradise' }
  ];

  hotels: HotelForCard[] = [];
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.hotelService.filters$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filters => {
        if (filters) {
          this.searchWithFilters(filters);
        } else {
          this.loadHotels();
        }
      });
  }
  
  handleSearch(filters: SearchFilters): void {
    this.hotelService.updateFilters(filters);
  }

  private transformHotelData(hotel: Hotel | HotelSearchResult): HotelForCard {
    const isSearchResult = 'hotelId' in hotel; // Type guard
    return {
      id: isSearchResult ? hotel.hotelId : hotel._id,
      name: isSearchResult ? hotel.hotelName : hotel.name,
      location: isSearchResult
        ? `${hotel.hotelLocation.city}, ${hotel.hotelLocation.province}, ${hotel.hotelLocation.country}`
        : `${hotel.location.city}, ${hotel.location.province}, ${hotel.location.country}`,
      imageUrl: hotel.images?.length > 0 ? hotel.images[0].url : 'default.jpg',
      rating: hotel.starRating || 0,
    };
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe({
      next: (data: Hotel[]) => {
        this.hotels = data.map(hotel => this.transformHotelData(hotel));
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Error loading hotels. Please try again.';
        this.hotels = [];
      }
    });
  }

  searchWithFilters(filters: SearchFilters) {
    if (!filters.persons || filters.persons <= 0) {
      this.errorMessage = 'The number of guests must be at least 1.';
      this.hotels = [];
      return;
    }

    this.hotelService.searchHotels(filters).subscribe({
      next: (results: HotelSearchResult[]) => {
        this.errorMessage = '';
        if (results.length === 0) {
          this.errorMessage = 'No hotels were found with the applied filters.';
          this.hotels = [];
          return;
        }
        this.hotels = results.map(hotel => this.transformHotelData(hotel));
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || 'Error searching. Please try again.';
        this.hotels = [];
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

interface HotelForCard {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
}
