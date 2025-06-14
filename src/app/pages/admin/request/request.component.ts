import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef } from '@angular/core';

@Component({
  selector: 'app-request',
  imports: [],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent {
  constructor(private http: HttpClient, private destroyRef: DestroyRef){}

  ngOnInit(){
    this.fetchRequest()
  }

  fetchRequest(){
    const subscription = this.http.get('http://localhost/school/admin/request.php').subscribe({
      next: (res: any) =>{
        console.log(res);
        
      }
    })

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })



  }

}
