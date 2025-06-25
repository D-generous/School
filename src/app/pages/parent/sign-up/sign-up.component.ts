import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { hasSameValue, mustContainSpecialCharacter } from '../../../form.model';
import { UsersserviceService } from '../../../service/usersservice.service';
import { Router } from '@angular/router';
import { ParentService } from '../../../service/parent.service';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private parentService: ParentService, private router: Router, private destroyRef: DestroyRef){}

  parentSignUpForm = new FormGroup({
    fname: new FormControl('', { validators: [Validators.required] }),
    lname: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    phone: new FormControl('', { validators: [Validators.required] }),
    checkbox: new FormControl(false, {validators: [Validators.requiredTrue]}),
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(4),
            mustContainSpecialCharacter,
          ],
        }),
        confirmpassword: new FormControl('', {
          validators: [
            Validators.required,
            Validators.minLength(4),
            mustContainSpecialCharacter,
          ],
        }),
      },
      {
        validators: [hasSameValue('password', 'confirmpassword')],
      }
    ),
  });

  get passwordValid() {
    return this.parentSignUpForm.get('passwords.password');
  }

  get passwordMismatch() {
    const group = this.parentSignUpForm.get('passwords');
    return group?.touched && group?.errors?.['notEqualValue'];
  }

  onSignUp() {
    if (this.parentSignUpForm.invalid) {
      return;
    }

    const obj={
      fname: this.parentSignUpForm.value.fname!,
      lname: this.parentSignUpForm.value.lname!,
      email: this.parentSignUpForm.value.email!,
      password: this.parentSignUpForm.value.passwords?.password!,
      phone: +this.parentSignUpForm.value.phone!,
    }

    const subscription = this.parentService.parentSignUp(obj).subscribe({
      next: (res:any)=>{
        console.log(res);
        
      }
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })

  }

  ngOnInit() {
  }
}
