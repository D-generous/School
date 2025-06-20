import { CommonModule, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { UsersserviceService } from '../../../service/usersservice.service';
import { ErrorModalComponent } from '../../../shared/modal/error-modal/error-modal.component';

@Component({
  selector: 'app-dashboard',
  imports: [NgClass, CommonModule, ErrorModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarOpen = false;
  isSmallScreen = false;
  isShowModal = false;
  username: any = ''
  userclass: any = ''

  constructor(
    private http: HttpClient,
    private studentService: UsersserviceService
  ) {}

  ngOnInit() {
    this.fetchcurrentAcademicYear()
    this.checkScreenSize();

    const token = this.studentService.getToken();

    if (token) {

      this.studentService.fetchData(token).subscribe({
        next: (res: any) => {
          console.log(res);
          this.username = res.user.username
          this.userclass = res.user.class
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

  @HostListener('window:resize')
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 768;
    if (!this.isSmallScreen) {
      this.isSidebarOpen = true; // keep open on desktop
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    if (this.isSmallScreen) {
      this.isSidebarOpen = false;
    }
  }

  onConfirm(){
    this.isShowModal = false
    this.studentService.logout()
  }

  currentAcademicYear:any = ''
  fetchcurrentAcademicYear(){
    this.studentService.currentAcademicYear().subscribe({
      next: (res:any) =>{
        console.log(res);
        
        this.currentAcademicYear = res
        console.log(this.currentAcademicYear);
        
      }
    })
  }
}
