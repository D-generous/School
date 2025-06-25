import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { studentInfo } from '../pages/student/student.model';
import { catchError, Observable, throwError } from 'rxjs';
import { UsersserviceService } from './usersservice.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private ngZone: NgZone, private router: Router, private http: HttpClient, private userService: UsersserviceService) { }

  expirationTimeOut?:any

  StudentSignUp(obj: studentInfo) {
    return this.userService.signUpUsers('http://localhost/school/student/signup.php', obj);
  }

  studentSignIn(obj: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.userService.signInUsers('http://localhost/school/student/signin.php', obj);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['student/signin']);
  }

  fetchData(token: string){
    return this.userService.fetchData('http://localhost/school/student/dashboard.php', token)
  }

  startSessionTimer(onTimeout: () => void) {
    const token = this.getToken();

    const decode = token && this.userService.decodeJwt(token);
    const exp = decode?.exp * 1000;

    if (exp && Date.now() < exp) {
      const delay = exp - Date.now();

      clearTimeout(this.expirationTimeOut);
      this.expirationTimeOut = setTimeout(() => {
        this.ngZone.run(onTimeout);
      }, delay);
    }
  }

  isTokenValid() {
    const token = this.getToken();

    if (token) {
      const decode = this.userService.decodeJwt(token);
      return decode && Date.now() < decode.exp * 1000;
    } else {
      return false;
    }
  }


}
