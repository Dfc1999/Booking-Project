import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../../services/login-service/login-service';
@Component({
  selector: 'app-button-logout',
  imports: [RouterModule],
  templateUrl: './button-logout.html',
  styleUrl: './button-logout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonLogout {
  constructor(private loginService: LoginService) {}

  logout() {
    this.loginService.logout().subscribe();
  }
}
