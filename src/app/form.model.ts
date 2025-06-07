import { AbstractControl, ValidationErrors } from "@angular/forms";

export function hasSameValue(controlName1: string, controlName2: string) {
    return (control: AbstractControl) => {
      const val1 = control.get(controlName1)?.value;
      const val2 = control.get(controlName2)?.value;
  
      if (val1 === val2) {
        return null;
      }
  
      return { doesNotHasSameValue: true };
    };
  }
  
  export function mustContainSpecialCharacter(control: AbstractControl): ValidationErrors | null{
  
      const value = control.value || null
    
      const hasSpecialChar = /[!@#$%^&*()-=+~`<>]/.test(value)
    
      return hasSpecialChar ? null : {mustContainSpecialCharacter: true}
    
    }