import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../../services/user-service/user-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/),
    ]),
  });
  registerError: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    this.registerError = null;
    if (this.registerForm.valid) {
      const user: User = {
        firstName: this.registerForm.value.firstName ?? '',
        lastName: this.registerForm.value.lastName ?? '',
        username: this.registerForm.value.username ?? '',
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
      };

      this.userService.register(user).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => {
          this.registerError = error.error?.details || 'Registration failed';
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
