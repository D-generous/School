import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TeacherService } from '../../../service/teacher.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private router: Router, private destroyRef: DestroyRef, private teacherService: TeacherService){}
  signInForm= new FormGroup({
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {validators: [Validators.required]})
  })

  errorMessage = ''

  onSubmit(){
    if (!this.signInForm.valid) {
      console.log("empty");
      return
    }

    const obj ={
      email: this.signInForm.value.email!,
      password: this.signInForm.value.password!

    }

    console.log(obj);
    
    this.teacherService.teacherSignIn(obj).subscribe({
      next: (res:any)=>{
        
        if (res.status === true) {
          console.log(res);
          this.teacherService.saveToken(res.token)
          this.router.navigate(['teacher/dashboard'])
          
        }else{
          this.errorMessage = res.message
          console.log(res);
          
        }
        
      }
    })

    setTimeout(() => {
      this.errorMessage = ''
    }, 3000);
  }

}
