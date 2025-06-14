import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { studentInfo } from '../pages/student/student.model';
import { teacherInfo } from '../pages/parent/teacher.model';
import { Router } from '@angular/router';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root'
})
export class UsersserviceService {

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone, private errorService: ErrorService) { }
  private expirationTimeOut?: any

  StudentSignUp(obj: studentInfo){
    return this.signUpUsers('http://localhost/school/student/signup.php', obj )
  }

  parentSignUp(obj: teacherInfo ){
    return this.signUpUsers('http://localhost/school/parent/signup.php', obj )
  }

  
  studentSignIn(obj: {email: string, password: string}): Observable<{token: string}>{
    return this.signInUsers('http://localhost/school/student/signin.php', obj)
  }

  // adminSignIn(obj: {email: string, password: string}){
  //   return this.signInUsers('http://localhost/school/admin/signin.php', obj)
  // }

  saveToken(token: string){
    localStorage.setItem('token', token)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['student/signin'])

  }

  decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(
        json
          .split('')
          .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      ));
    } catch {
      return null;
    }
  }

  startSessionTimer(onTimeout: () => void){
    const token = this.getToken()

    const decode = token && this.decodeJwt(token)
    const exp = decode?.exp * 1000

    if (exp && Date.now()<exp) {
      const delay = exp - Date.now()

      clearTimeout(this.expirationTimeOut)
      this.expirationTimeOut = setTimeout(() => {
        this.ngZone.run(onTimeout)
      }, delay);
      
    }

  }



  isTokenValid(){
    const token = this.getToken()

    if (token) {
      const decode = this.decodeJwt(token)
      return decode && Date.now() < decode.exp * 1000
      
    }else{
      return false
    }
  }

  private signInUsers(url: string, obj: {}){
    return this.http.post<{token: string}>(url, obj)
  }


  private signUpUsers(url: string, obj: {}){
    return this.http.post(url, obj)
  }
}
