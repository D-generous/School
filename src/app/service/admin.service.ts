import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private ngZone: NgZone, private router: Router) { }
  private expireTimeOut?:any

  
  adminSignIn(obj: {email: string, password: string}){
    return this.http.post('http://localhost/school/admin/signin.php', obj)
  }

  saveToken(token: string){
    localStorage.setItem('admintoks', token)
  }

  getToken (){
    return localStorage.getItem('admintoks')
  }

  logout(){
    localStorage.removeItem('admintoks')
    this.router.navigate(['admin/signin'])

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
  
  startSessionTimeOut(onTimeOut: ()=> void){
    const token = this.getToken()

    if (token) {
      const decoded = this.decodeJwt(token)
      const exp = decoded && decoded.exp * 1000

      if (exp && Date.now() < exp) {

        const remainingTime = exp - Date.now()

        this.expireTimeOut = setTimeout(() => {
          this.ngZone.run(onTimeOut)
          
        }, remainingTime);
        
      }


      
    }
  }



  isValidToken(){
    const token = this.getToken()

    if (token) {
      const decoded = this.decodeJwt(token)
      const exp = decoded && decoded.exp * 1000

      return exp && Date.now() < exp
      
    }

    return false
  }


  fetchData(token: any) {
    return this.http
      .get('http://localhost/school/admin/dashboard.php', {
        headers: { Authorization: `Bearer ${token}` },
      })

    }
  
}
