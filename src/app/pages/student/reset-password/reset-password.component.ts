import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private http: HttpClient, private destroyRef: DestroyRef, private router: Router){}

  resetForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required]}),
    // token: new FormControl(''),
    // newpassword: new FormControl('')
  })
  

  errorMessage = ''
  displayOtherForm = false
  spin = true

  onSubmit(){
    if (!this.resetForm.valid) {
      console.log("Invalid");
      return
      
    }

    this.spin = false
    const obj = {
      email: this.resetForm.value.email!
    }
    
    console.log(obj);
    
    const subscription = this.http.patch('http://localhost/school/student/resetpassemail.php', obj).subscribe({
      next: (res: any)=>{
        if (res.status === true) {
          console.log(res);
          // this.displayOtherForm = true


          this.spin = true
          this.router.navigate(['/student/resetpassword', res.userId])




          // const obj2 = {
          //   token: this.otherResetForm.value.token!,
          //   newpassword: this.otherResetForm.value.newpassword!,
          // }
          // console.log(obj2);
          
        }

        this.errorMessage = res.message
        console.log(res);
        console.log(this.errorMessage);
        
        
      }
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })

    setTimeout(() => {
      this.errorMessage = ''
      
    }, 3000);

  }

  onOtherSubmit(){


  }

}
