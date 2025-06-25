import { Injectable, NgZone } from '@angular/core';
import { UsersserviceService } from './usersservice.service';
import { teacherInfo } from '../pages/parent/teacher.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private userService: UsersserviceService, private router: Router, private ngZone: NgZone) { }
  expirationTimeout?: any

  teacherSignUp(obj: teacherInfo){
    return this.userService.signUpUsers('http://localhost/school/teacher/signup.php', obj)
  }

  teacherSignIn(obj: {email: string, password: string}): Observable<{ token: string }>{
    return this.userService.signInUsers('http://localhost/school/teacher/signin.php', obj)
  }

  saveToken(token: string){
    localStorage.setItem('teachertoken', token)
  }

  getToken(){
    return localStorage.getItem('teachertoken')
  }

  logout(){
    localStorage.removeItem('teachertoken')
    this.router.navigate(['teacher/signin'])
  }

  fetchData(token: string){
    return this.userService.fetchData('http://localhost/school/teacher/dashboard.php', token)
  }
  // isTokenValid(){
  //   const token = this.getToken()

  //   if (token) {
  //     const decoded = this.userService.decodeJwt(token)
  //     const exp = decoded.exp * 1000
  //     return decoded && Date.now() < exp
      
  //   }
  //   return false
  // }

  // startSessionTimeOut(onTimeOut: () => void){
  //   const token = this.getToken()

   
  //     const decoded = token && this.userService.decodeJwt(token)

  //     const exp = decoded?.exp * 1000

  //     if (exp && Date.now() < exp) {
  //       const remainingTime = exp - Date.now()

  //       clearTimeout(this.expirationTimeout)
  //       this.expirationTimeout = setTimeout(() => {
  //         this.ngZone.run(onTimeOut)
  
          
  //       }, remainingTime);
        
  //     }


    

  // }

}
