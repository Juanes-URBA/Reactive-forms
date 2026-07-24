import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { passwordMatchValidator } from '../../validators/password-match.validator';

interface RegisterSummary {
  fullName: string;
  email: string;
  username: string;
  age: number;
  terms: boolean;
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  form: FormGroup;
  registerSummary: RegisterSummary | null = null;

  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        age: [null, [Validators.required, Validators.min(15), Validators.max(90)]],
        terms: [false, [Validators.requiredTrue]]
      },
      { validators: passwordMatchValidator }
    );
  }

  isInvalid(controlName: string, errorType: string): boolean {
    const control = this.form.get(controlName);
    if (!control) {
      return false;
    }
    return control.hasError(errorType) && (control.touched || control.dirty);
  }

  get passwordMismatch(): boolean {
    const confirmPassword = this.form.get('confirmPassword');
    return (
      !!this.form.errors?.['passwordMismatch'] &&
      !confirmPassword?.hasError('required') &&
      (confirmPassword?.touched || confirmPassword?.dirty || false)
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onClick(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fullName, email, username, age, terms } = this.form.value;

    this.registerSummary = { fullName, email, username, age, terms };
  }

  onNewRegister(): void {
    this.registerSummary = null;
    this.form.reset();
  }
}