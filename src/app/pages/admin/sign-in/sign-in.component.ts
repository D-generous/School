import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersserviceService } from '../../../service/usersservice.service';
import { subscribeOn } from 'rxjs';
import { AdminService } from '../../../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private adminService: AdminService, private destroyRef: DestroyRef, private router: Router){}

  signInForm = new FormGroup({
    email: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]})
  })


  onSubmit(){
    if (this.signInForm.invalid) {
      return
    }

    const obj = {
      email: this.signInForm.value.email!,
      password: this.signInForm.value.password!
    }

    console.log(obj);

    const subscription = this.adminService.adminSignIn(obj).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.status === true) {
          this.adminService.saveToken(res.token)
          this.router.navigate(['admin/dashboard'])
        }
        

      }
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })


    
  }
}
