import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { studentInfo } from '../pages/student/student.model';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  // signUpUser(obj: studentInfo){
  //   return this.http.post('http://localhost/school/student/signup.php', obj).pipe((catchError((error)=> {
  //     return throwError(()=> new Error('Kilode gan'))
  //   })))
  // }



}
