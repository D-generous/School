import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasSameValue, mustContainSpecialCharacter } from '../../../form.model';


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  teacherSignUpForm = new FormGroup({
    fname: new FormControl('', {validators: [Validators.required]}),
    lname: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [ Validators.required, Validators.email]}),
    phone: new FormControl('', {validators: [Validators.required]}),
    passwords: new FormGroup({
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(4), mustContainSpecialCharacter]}),
      confirmpassword: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]})
    }, {validators: [hasSameValue('password', 'confirmpassword')]}),
    checkbox: new FormControl(false, {validators: [Validators.requiredTrue]})
  })

  get validPassword(){
    return this.teacherSignUpForm.get('passwords.password')
  }
  get passwordMismatch(){
    const group = this.teacherSignUpForm.get('passwords')
    return group?.touched && group.errors?.['doesNotHasSameValue']
  }
  onSignUp(){
    if (this.teacherSignUpForm.invalid) {
      return
    }

    console.log(this.teacherSignUpForm.value);
    

  }


}
