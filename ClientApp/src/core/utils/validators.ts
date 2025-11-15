import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[#?!@$%^&*-]/.test(value);
    const isValidLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial && isValidLength;
    return !passwordValid ? { invalidPassword: true } : null;
  };
}

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? { invalidEmail: true } : null;
  };
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return !phoneRegex.test(value) ? { invalidPhone: true } : null;
  };
}

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    try {
      new URL(value);
      return null;
    } catch {
      return { invalidUrl: true };
    }
  };
}

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const isWhitespace = value.trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  };
}

export function matchValidator(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parent = control.parent;
    if (!parent) return null;

    const matchingControl = parent.get(matchTo);
    if (!matchingControl) return null;

    return control.value !== matchingControl.value ? { notMatching: true } : null;
  };
}