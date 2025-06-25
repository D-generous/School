import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { hasSameValue, mustContainSpecialCharacter } from '../../../form.model';
import { TeacherService } from '../../../service/teacher.service';
import { teacherInfo } from '../../parent/teacher.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private teacherService: TeacherService, private destroyRef: DestroyRef, private router: Router){}
  errorMessage = ''

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


    const obj ={
      fname: this.teacherSignUpForm.value.fname!,
      lname: this.teacherSignUpForm.value.lname!,
      email: this.teacherSignUpForm.value.email!,
      password: this.teacherSignUpForm.value.passwords?.password!,
      phone: +this.teacherSignUpForm.value.phone!,
    }
    console.log(this.teacherSignUpForm.value);

    const subscription = this.teacherService.teacherSignUp(obj).subscribe({
      next: (res: any)=>{

        if (res.status === true) {
          console.log(res);
          this.router.navigate(['/teacher/signin'])
          
        }else{
          console.log(res);
          
          this.errorMessage = res.message
        }
         
      }
    })

    setTimeout(() => {
      this.errorMessage = ''
      
    }, 3000);

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
    


  }


}
