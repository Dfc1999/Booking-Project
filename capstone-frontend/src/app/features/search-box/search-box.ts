import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SearchFilters } from '../../core/services/hotel-service/hotel-service';
@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './search-box.html',
  styleUrls: ['./search-box.scss'],
})
export class SearchBox {
  @Output() search = new EventEmitter<SearchFilters>();
  @Output() filtersCleared = new EventEmitter<void>();

  searchForm!: FormGroup;
  locations = ['Bolivia', 'Argentina', 'Chile', 'Peru', 'Brazil'];

  today = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      location: ['', Validators.required],
      checkIn: [null as Date | null, Validators.required],
      checkOut: [null as Date | null, Validators.required],
      persons: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.search.emit(this.searchForm.value as SearchFilters);
    } else {
      console.log('Formulario no válido');
      this.searchForm.markAllAsTouched();
    }
  }

  clearFilters(): void {
    this.searchForm.reset({
      location: '',
      checkIn: null,
      checkOut: null,
      persons: 1
    });
    this.filtersCleared.emit();
  }
}