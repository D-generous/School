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
    private destroyRef: DestroyRef
  ) {}
  selectedSection: string = 'dashboard';
  isOpen = false;

  selectSection(section: string) {
    this.selectedSection = section;

    // Auto-close the sidebar on small screens
    const checkbox = document.getElementById('sidebar-toggle') as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }
  ngOnInit() {
    const token = this.adminService.getToken();
    if (token) {
      this.fetchData(token);

      this.adminService.startSessionTimeOut(() => {
        this.isOpen = true;
      });
    }
  }

  fetchData(token: any) {
    this.http
      .get('http://localhost/school/admin/dashboard.php', {
        headers: { Authorization: `Bearer ${token}` },
      })
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
