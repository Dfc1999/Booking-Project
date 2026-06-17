import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  {
    path: 'login',
    loadComponent: () => import('./core/pages/login/login').then(mod => mod.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./core/pages/register/register').then(mod => mod.Register)
  },
  {
    path: 'hotel/:id',
    loadComponent: () => import('./features/hotel-detail-page/hotel-detail-page').then(mod => mod.HotelDetailPage)
  },
  {
    path: 'bookings',
    loadComponent: () => import('./features/booking-page/booking-page').then(mod => mod.BookingPage)
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found').then(mod => mod.NotFound)
  }
];