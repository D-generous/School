import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersserviceService } from '../../../service/usersservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private studentService: UsersserviceService, private router: Router){}


  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(){

    const obj ={
      email: this.signInForm.value.email!,
      password: this.signInForm.value.password!
    }
    
    this.studentService.studentSignIn(obj).subscribe({
      next: (res: any)=>{
        console.log(res);

        if (res.status === true) {
          this.studentService.saveToken(res.token)
          this.router.navigate(['/student/dashboard'])
          
        }
        
      }
    })
    console.log(this.signInForm.value);
    
  }

}
