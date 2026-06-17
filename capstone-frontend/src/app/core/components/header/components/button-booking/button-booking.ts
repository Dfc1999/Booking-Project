import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button-booking',
  imports: [RouterModule],
  templateUrl: './button-booking.html',
  styleUrl: './button-booking.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonBooking {

}
