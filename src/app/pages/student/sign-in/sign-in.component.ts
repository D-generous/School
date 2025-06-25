import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersserviceService } from '../../../service/usersservice.service';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../../service/student.service';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private studentService: StudentService, private router: Router, private destroyRef: DestroyRef){}

  errorMessage = ''

  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(){

    const obj ={
      email: this.signInForm.value.email!,
      password: this.signInForm.value.password!
    }
    
    const subscription = this.studentService.studentSignIn(obj).subscribe({
      next: (res: any)=>{
        console.log(res);

        if (res.status === true) {
          this.studentService.saveToken(res.token)
          this.router.navigate(['/student/dashboard'])
          
        }else{
          this.errorMessage = res.message

        }
        
      }
    })
    console.log(this.signInForm.value);
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
    
    setTimeout(() => {
      this.errorMessage = ''    
    }, 3000);
  }
  


}
