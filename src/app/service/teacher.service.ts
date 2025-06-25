import { Injectable } from '@angular/core';
import { UsersserviceService } from './usersservice.service';
import { teacherInfo } from '../pages/parent/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private userService: UsersserviceService) { }

  teacherSignUp(obj: teacherInfo){
    return this.userService.signUpUsers('http://localhost/school/teacher/signup.php', obj)
  }

  teacherSignIn(obj: {email: string, password: string}){
    return this.userService.signInUsers('http://localhost/school/teacher/signin.php', obj)
  }

}
