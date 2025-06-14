import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { ErrorModalComponent } from '../../../shared/modal/error-modal/error-modal.component';
import { RequestComponent } from '../request/request.component';

@Component({
  selector: 'app-dashboard',
  imports: [ErrorModalComponent, RequestComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private http: HttpClient, private adminService: AdminService, private destroyRef: DestroyRef){}
  isOpen = false

  ngOnInit(){
    const token = this.adminService.getToken()
    if (token) {
      this.fetchData(token)

      this.adminService.startSessionTimeOut(()=>{
        this.isOpen = true

      })
    }
  }

  fetchData(token: any){
    this.http.get('http://localhost/school/admin/dashboard.php', {headers: {Authorization: `Bearer ${token}`}}).subscribe({
      next: (res: any) =>{

        console.log(res);


        
      },
      error: (err) =>{
        if (err.status === 401 || err.status === 403) {
          this.adminService.logout()
        }
      }
    })

  }


  onConfirm(){
    this.isOpen = false
    this.adminService.logout()
  }


  isRequestOpen = false
  onFetch(){
    this.isRequestOpen = true

  }

}
