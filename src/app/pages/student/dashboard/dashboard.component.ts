import { CommonModule, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { UsersserviceService } from '../../../service/usersservice.service';
import { ErrorModalComponent } from '../../../shared/modal/error-modal/error-modal.component';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ErrorModalComponent, PaymentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarOpen = false;
  isSmallScreen = false;
  isShowModal = false;
  username: any = '';
  userclass: any = '';
  userdetails?: any;

  constructor(
    private http: HttpClient,
    private studentService: UsersserviceService
  ) {}

  ngOnInit() {
    this.fetchcurrentAcademicYear();

    const token = this.studentService.getToken();

    if (token) {
      this.studentService.fetchData(token).subscribe({
        next: (res: any) => {
          console.log(res);
          this.username = res.user.username;
          this.userclass = res.user.class;
          console.log(this.username);
        },
        error: (err) => {
          if (err.status === 401) {
            this.studentService.logout();
          }
        },
      });

      this.studentService.startSessionTimer(() => {
        this.isShowModal = true;
      });
    }
  }

  selectedSection: string = 'dashboard';

  selectSection(section: string) {
    this.selectedSection = section;

    const checkbox = document.getElementById(
      'sidebar-toggle'
    ) as HTMLInputElement;
    if (checkbox) checkbox.checked = false;
  }

  onConfirm() {
    this.isShowModal = false;
    this.studentService.logout();
  }

  currentAcademicYear: any = '';
  fetchcurrentAcademicYear() {
    this.studentService.currentAcademicYear().subscribe({
      next: (res: any) => {
        console.log(res);

        this.currentAcademicYear = res;
        console.log(this.currentAcademicYear);

        // console.log(this.currentAcademicYear);
        this.checkPaymentValidity(this.currentAcademicYear);
      },
    });
  }

  validPayment = false
  checkPaymentValidity(data: any) {
    const token = this.studentService.getToken();
    if (token) {
      this.studentService.fetchData(token).subscribe({
        next: (res: any) => {
          console.log(data);
          this.userdetails = res.user;
          console.log(this.userdetails);

          const obj = {
            studentid: this.userdetails.id,
            class: this.userdetails.class,
            term: data.term,
            year: data.year,
          };

          console.log(obj);
          
          this.http
            .put('http://localhost/school/paymentvalidity.php', obj)
            .subscribe({
              next: (res: any) => {
                if (res.status === true) {
                  this.validPayment = true
                }
                console.log(res);
              },
            });
        },
      });
    }
  }
}
