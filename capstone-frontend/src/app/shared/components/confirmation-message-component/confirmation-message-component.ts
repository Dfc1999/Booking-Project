import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirmation-message',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './confirmation-message-component.html',
  styleUrls: ['./confirmation-message-component.scss']
})
export class ConfirmationMessageComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}