import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StudentService } from '../../../service/student.service';
import { hasSameValue, mustContainSpecialCharacter } from '../../../form.model';
import { UsersserviceService } from '../../../service/usersservice.service';

// function mustContainSpecialCharacter(control: AbstractControl) {
//   if (
//     control.value.includes('#') ||
//     control.value.includes('?') ||
//     control.value.includes('!') ||
//     control.value.includes('$') ||
//     control.value.includes('@') ||
//     control.value.includes('%') ||
//     control.value.includes('&') ||
//     control.value.includes('*') ||
//     control.value.includes('^') ||
//     control.value.includes('(') ||
//     control.value.includes(')') ||
//     control.value.includes('-') ||
//     control.value.includes('+') ||
//     control.value.includes('=') ||
//     control.value.includes('_')
//   ) {
//     return null;
//   }

//   return { doesNotContainSpecialCharacter: false };
// }

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  showOption = false;
  constructor(
    private studentService: UsersserviceService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  studentSignUpForm = new FormGroup({
    fname: new FormControl('', { validators: [Validators.required] }),
    lname: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    gender: new FormControl<'' | 'Male' | 'Female'>('', {
      validators: [Validators.required],
    }),
    dob: new FormControl('', { validators: [Validators.required] }),
    phone: new FormControl('', { validators: [Validators.required] }),
    class: new FormControl<
      '' | 'JSS1' | 'JSS2' | 'JSS3' | 'SSS1' | 'SSS2' | 'SSS3'
    >('', { validators: [Validators.required] }),

    option: new FormControl<'' | 'SCIENCE' | 'COMMERCIAL' | 'ART'>(''),
    guardian_email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
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
    checkbox: new FormControl(false, { validators: [Validators.requiredTrue] }),
  });

  // ngOnInit() {
  //   this.studentSignUpForm
  //     .get('passwords.password')
  //     ?.statusChanges.subscribe(() => {
  //       console.log(this.studentSignUpForm.get('passwords.password')?.errors);
  //     });
  // }

  get emailIsValid() {
    return (
      (this.studentSignUpForm.controls.email.touched ||
        this.studentSignUpForm.controls.email.dirty) &&
      this.studentSignUpForm.controls.email.invalid
    );
  }
  get guardianEmailIsValid() {
    return (
      this.studentSignUpForm.controls.guardian_email.touched &&
      this.studentSignUpForm.controls.guardian_email.dirty &&
      this.studentSignUpForm.controls.guardian_email.invalid
    );
  }

  get passwordControl() {
    return this.studentSignUpForm.get('passwords.password');
  }

  get passwordMismatch() {
    const group = this.studentSignUpForm.get('passwords');
    return group?.touched && group?.errors?.['passwordNotEqual'];
  }

  onSelectClass() {
    if (
      this.studentSignUpForm.value.class === 'SSS3' ||
      this.studentSignUpForm.value.class === 'SSS2' ||
      this.studentSignUpForm.value.class === 'SSS1'
    ) {
      this.showOption = true;
    }else{
      this.showOption = false
    }

  }
  onSignUp() {
    if (this.studentSignUpForm.invalid) {
      console.log('Invalid form');
      return;
    }
    console.log(this.studentSignUpForm);

    const obj = {
      fname: this.studentSignUpForm.value.fname!,
      lname: this.studentSignUpForm.value.lname!,
      email: this.studentSignUpForm.value.email!,
      gender: this.studentSignUpForm.value.gender!,
      dob: this.studentSignUpForm.value.dob!,
      phone: this.studentSignUpForm.value.phone!,
      class: this.studentSignUpForm.value.class!,
      guardian_email: this.studentSignUpForm.value.guardian_email!,
      option: this.studentSignUpForm.value.option || null,
      password: this.studentSignUpForm.value.passwords?.password!,
      profilepicture: this.studentSignUpForm.value.gender === 'Male' ? 'boy.png' : 'girl.png' 
    };

    const subscription = this.studentService.StudentSignUp(obj).subscribe({
      next: (res: any) => {
        console.log(res);

        // if (res.status === true) {
        //   this.router.navigate(['/student/signin']
        //     // , { replaceUrl: true }
        //   );
        // }
        alert("You have successfully submitted your application. We will get back to you after the admission committee have review your profile. Thank you.")
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
