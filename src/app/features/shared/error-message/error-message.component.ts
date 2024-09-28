import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() control!: AbstractControl | null;

  errorMessages: { [key: string]: string } = {
    required: 'Este campo es obligatorio.',
    minlength: 'Debe tener al menos 5 caracteres.',
    min: 'Debe ser mayor de 18.',
    uniqueName: 'Nombre debe ser único.',
    atLeastOnePerson: 'Debe agregar al menos una persona.',
  };

  /**
   * Returns the first error message
   * @param errors
   */
  getErrorMessage(errors: ValidationErrors | null): string {
    if (!errors) return '';
    const firstErrorKey = Object.keys(errors)[0];
    return this.errorMessages[firstErrorKey] || 'Error desconocido';
  }
}
