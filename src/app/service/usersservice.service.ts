import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { studentInfo } from '../pages/student/student.model';
import { teacherInfo } from '../pages/parent/teacher.model';
import { Router } from '@angular/router';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class UsersserviceService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone,
    private errorService: ErrorService
  ) {}
  private expirationTimeOut?: any


  decodeJwt(token: string): any {
    try {
      const payload = token.split('.')[1];
      const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(
        decodeURIComponent(
          json
            .split('')
            .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
            .join('')
        )
      );
    } catch {
      return null;
    }
  }



  public signInUsers(url: string, obj: {}) {
    return this.http.post<{ token: string }>(url, obj);
  }

  public signUpUsers(url: string, obj: {}) {
    return this.http.post(url, obj);
  }

  fetchData(url: string, token: string) {
    return this.http.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  currentAcademicYear(){
    return this.http.get('http://localhost/school/academicyear.php')

  }
}
