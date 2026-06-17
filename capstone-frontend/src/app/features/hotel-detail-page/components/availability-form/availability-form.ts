import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-availability-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './availability-form.html',
  styleUrl: './availability-form.scss'
})
export class AvailabilityForm {
  @Input({ required: true }) dateForm!: FormGroup;
  @Output() searchAvailability = new EventEmitter<void>();

  today = new Date();

  onSubmit() {
    this.searchAvailability.emit();
  }
}
