import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/student/sign-up/sign-up.component';
import { DashboardComponent } from './pages/student/dashboard/dashboard.component';
import { SignInComponent } from './pages/student/sign-in/sign-in.component';
import { SignUpComponent as ParentSignUp } from './pages/parent/sign-up/sign-up.component';
import { SignInComponent as ParentSignIn } from './pages/parent/sign-in/sign-in.component';
import { DashboardComponent as ParentDash } from './pages/parent/dashboard/dashboard.component';
import { SignUpComponent as TeacherSignUp } from './pages/teacher/sign-up/sign-up.component';
import { authGuard } from './guard/auth.guard';
import { SignInComponent as adminSignIn } from './pages/admin/sign-in/sign-in.component';
import { DashboardComponent as adminDash } from './pages/admin/dashboard/dashboard.component';
import { adminauthGuard } from './guard/adminauth.guard';
import { PaymentComponent } from './pages/student/payment/payment.component';
import { ResetPasswordComponent } from './pages/student/reset-password/reset-password.component';
import { PasswordresetComponent } from './pages/student/passwordreset/passwordreset.component';
import { SignInComponent as TeacherSignIn } from './pages/teacher/sign-in/sign-in.component';
import { DashbboardComponent as teacherDash } from './pages/teacher/dashbboard/dashbboard.component';
// import { DashbboardComponent as adminDash } from './pages/admin/dashboard/dashboard.component';

export const routes: Routes = [
    {path: 'student/signup', component: SignUpComponent},
    {path: 'student/signin', component: SignInComponent},
    {path: 'student/dashboard', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'payment', component: PaymentComponent},
    {path: 'student/resettoken', component: ResetPasswordComponent},
    {path: 'student/resetpassword/:userId', component: PasswordresetComponent},

    {path: 'parent/signup', component: ParentSignUp},
    {path: 'parent/signin', component: ParentSignIn},
    {path: 'parent/dashboard', component: ParentDash},


    {path: 'teacher/signup', component:  TeacherSignUp},
    {path: 'teacher/signin', component:  TeacherSignIn},
    {path: 'teacher/dashboard', component:  teacherDash},
    // {path: 'test', component: ErrorModalComponent}

    {path: 'admin/signin', component: adminSignIn},
    {path: 'admin/dashboard', component: adminDash, canActivate: [adminauthGuard]}
];
