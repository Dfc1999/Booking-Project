import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login-service/login-service';
import { ButtonLogin } from './components/button-login/button-login';
import { UserMenu } from './components/user-menu/user-menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ButtonLogin, UserMenu], 
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {
  constructor(public loginService: LoginService) {}

  logout(): void {
    this.loginService.logout().subscribe();
  }
}


