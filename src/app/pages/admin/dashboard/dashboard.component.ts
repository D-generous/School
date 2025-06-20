import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { ErrorModalComponent } from '../../../shared/modal/error-modal/error-modal.component';
import { RequestComponent } from '../request/request.component';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersserviceService } from '../../../service/usersservice.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    ErrorModalComponent,
    RequestComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(
    private http: HttpClient,
    private adminService: AdminService,
    private userService: UsersserviceService,
    private destroyRef: DestroyRef
  ) {}
  selectedSection: string = 'dashboard';
  isOpen = false;

  termSwitch = new FormGroup({
    term: new FormControl<'Choose term' | '1st Term' | '2nd Term' | '3rd Term'>('Choose term', {validators: [Validators.required]})
  })

  onSwitch(){

    

    this.userService.currentAcademicYear().subscribe({
      next: (res: any)=>{

        const obj = {
          term: this.termSwitch.value.term,
          year: res.year
        }

        console.log(obj);

        this.http.post('http://localhost/school/term.php', obj).subscribe({
          next: (res: any) => {
            console.log(res);
          },
        });
        
        
      }
    })
    
  }


  selectSection(section: string) {
    this.selectedSection = section;

    // Auto-close the sidebar on small screens
    const checkbox = document.getElementById('sidebar-toggle') as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }
  ngOnInit() {
    const token = this.adminService.getToken();
    if (token) {
      this.fetchData();

      this.adminService.startSessionTimeOut(() => {
        this.isOpen = true;
      });
    }
  }

  fetchData() {
    const token = this.adminService.getToken()
    if (token) {
      this.adminService.fetchData(token)
        .subscribe({
          next: (res: any) => {
            console.log(res);
          },
          error: (err) => {
            if (err.status === 401 || err.status === 403) {
              this.adminService.logout();
            }
          },
        });
      
    }
  }

  onConfirm() {
    this.isOpen = false;
    this.adminService.logout();
  }

  isRequestOpen = false;
  onFetch() {
    this.isRequestOpen = true;
  }

  sessionForm = new FormGroup({
    session: new FormControl('', { validators: [Validators.required] }),
  });
  updateSession() {
    if (this.sessionForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const obj = {
      session: this.sessionForm.value.session,
    };

    this.http.post('http://localhost/school/admin/session.php', obj).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });
  }
}
