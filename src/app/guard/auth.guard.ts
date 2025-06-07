import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsersserviceService } from '../service/usersservice.service';

export const authGuard: CanActivateFn = (route, state) => {
  const studentService = inject(UsersserviceService)
  const router = inject(Router)

  if (studentService.isTokenValid()) {
    return true;
    
  }

  router.navigate(['/student/signin'])
  // studentService.logout()
  return false


};
