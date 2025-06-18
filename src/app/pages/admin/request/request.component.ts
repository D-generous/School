import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request',
  imports: [FormsModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
})
export class RequestComponent {
  constructor(private http: HttpClient, private destroyRef: DestroyRef, private adminService: AdminService) {}

  ngOnInit() {
    this.fetchRequest();

  }

  comment: {[id: number]: string} = {}

  

  details: any[] = [];

  fetchRequest() {
    const subscription = this.http
      .get('http://localhost/school/admin/request.php')
      .subscribe({
        next: (res: any) => {
          this.details = res.result;

          console.log(res, this.details);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  obj: {id: number, comment: string, status: string} = {id: 0, comment: '', status: ''}

  onAccept(id: number){

    if (!this.comment[id]) {
      alert("Please enter a comment");
      return;
    }

    this.obj = {
      id: id,
      comment: this.comment[id],
      status: "accepted"
    }

    this.update(this.obj)


    
  }

  onReject(id: number){
    if (!this.comment[id]) {
      alert("Please enter a comment");
      return;
    }
    // console.log(id);
    this.obj = {
      id: id,
      comment: this.comment[id],
      status: "rejected"


    }

    this.update(this.obj)
    
  }

  update(obj: {id: number, comment: string, status: string}){
    this.http.patch('http://localhost/school/admin/request.php', obj).subscribe({
      next: (res: any)=>{
        console.log(res);
        this.fetchRequest()
        
      }
    })

    
  }
}
