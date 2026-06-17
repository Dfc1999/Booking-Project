import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div style="text-align:center; margin-top: 100px;">
      <h1 style="font-size: 6rem; color: red;">404</h1>
      <h2 style="font-size: 2rem;">Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a routerLink="/home">Go back to Home</a>
    </div>
  `
})
export class NotFound {}
