import { Injectable } from '@angular/core';
import { teacherInfo } from '../pages/parent/teacher.model';
import { UsersserviceService } from './usersservice.service';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private userService: UsersserviceService) { }

  parentSignUp(obj: teacherInfo) {
    return this.userService.signUpUsers('http://localhost/school/parent/signup.php', obj);
  }
}
