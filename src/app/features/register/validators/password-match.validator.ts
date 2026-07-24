import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validador a nivel de FormGroup.
 * Compara los campos 'password' y 'confirmPassword'.
 * Si no coinciden, marca el error 'passwordMismatch' en el grupo.
 */
export function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
}