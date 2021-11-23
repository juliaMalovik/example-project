import {AbstractControl} from "@angular/forms";

export function noOnlyWhitespaceValidator(control: AbstractControl) {
  const value = control.value || '';
  const isWhitespace = value.trim().length === 0;
  const isValid = control.value ? !isWhitespace : true;
  return isValid ? null : {'whitespace': true};
}
