import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorModalComponent } from "../../../shared/modal/error-modal/error-modal.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  imports: [ReactiveFormsModule, ErrorModalComponent],
  templateUrl: './passwordreset.component.html',
  styleUrl: './passwordreset.component.css'
})
export class PasswordresetComponent {
  constructor(private http: HttpClient, private destroyRef: DestroyRef, private router: Router){}
  userId = input.required<string>()

  resetForm = new FormGroup({
    // user: new FormControl('', {validators: [Validators.required]}),
    token: new FormControl('', {validators: [Validators.required]}),
    newpassword: new FormControl('', {validators: [Validators.required]})
  })

  errorMessage = ''
  showModal = false

  onSubmit(){
    console.log(this.userId());

    if (!this.resetForm.valid) {
      return
      
    }

    const obj ={
      token: this.resetForm.value.token!,
      newpassword: this.resetForm.value.newpassword!,
      userid: this.userId()
    }

    const subscription = this.http.patch('http://localhost/school/student/resetpassword.php', obj).subscribe({
      next: (res: any)=>{
        console.log(res); 
        
        this.errorMessage = res.message

        if (res.status === true) {
          this.showModal = true
          
        }
        
      }
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })

    setTimeout(() => {
      this.errorMessage = ''
      
    }, 3000);
    
  }


  onConfirm(){
    this.router.navigate(['/student/signin'])
  }

}
