import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel implements OnInit, OnDestroy {
  @Input() images: CarouselImage[] | null = null;
  currentSlide = 0;
  private autoSlideInterval: number | undefined;

  ngOnInit() {
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 4000);
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) clearInterval(this.autoSlideInterval);
  }

  nextSlide() {
    if (this.images?.length)
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    if (this.images?.length)
      this.currentSlide =
        (this.currentSlide - 1 + this.images.length) % this.images.length;
  }
}

export interface CarouselImage {
  url: string;
}
