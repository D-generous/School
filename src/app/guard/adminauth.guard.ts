import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

export const adminauthGuard: CanActivateFn = (route, state) => {
  const adminService = inject(AdminService);
  const router = inject(Router);
  if (adminService.isValidToken()) {
    return true;
    
  }
  router.navigate(['admin/signin'])
  return false
};
