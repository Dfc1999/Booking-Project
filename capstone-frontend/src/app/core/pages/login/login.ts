import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login-service/login-service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/),
    ]),
  });
  loginError: string | null = null;

  constructor(private router: Router, private loginService: LoginService) {}

  onSubmit() {
    this.loginError = null;
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username && password) {
        this.loginService.login(username, password).subscribe({
          next: () => this.router.navigate(['/home']),
          error: () => this.loginError = 'Credenciales inválidas',
        });
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}