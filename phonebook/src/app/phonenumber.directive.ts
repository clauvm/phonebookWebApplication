import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[appPhonenumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: PhonenumberDirective, multi: true}]
})
export class PhonenumberDirective implements Validator {

  constructor() {
  }

  /**
   * Validate the phonenumber
   * @param control
   */
  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.allowedNameValidator(new RegExp("\\+[0-9]+\\s[0-9]+\\s[0-9]{6,}$", 'i'))(control)
  }

  public allowedNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const allowed = nameRe.test(control.value);
      return allowed ? null : {'forbiddenName': {value: control.value}};
    };
  }

}

