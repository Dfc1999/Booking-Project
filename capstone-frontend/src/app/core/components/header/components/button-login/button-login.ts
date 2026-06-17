import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-button-login',
  imports: [RouterModule],
  templateUrl: './button-login.html',
  styleUrl: './button-login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonLogin {

}
