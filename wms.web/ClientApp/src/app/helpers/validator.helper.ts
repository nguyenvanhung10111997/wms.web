import { AbstractControl } from "@angular/forms";
import { PHONE_REGEX } from "../config/constants";

export function phoneValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) {
    return null;
  }

  const valid = PHONE_REGEX.test(control.value);
  return valid ? null : { invalidPhone: true };
}

export function matchingPwdValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const password = control.get("password");
  const passwordRepetition = control.get("passwordRepetition");

  if (!password?.value || !passwordRepetition?.value) {
    return null;
  }

  const isMatching = password.value === passwordRepetition.value;
  return isMatching ? null : { isNotMatching: true };
}
