import { HttpInterceptorFn } from "@angular/common/http";
import { UsersserviceService } from "../service/usersservice.service";
import { inject } from "@angular/core";

// export interface Auth {
// }

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const loginService = inject(UsersserviceService);
    const token = loginService.getToken();
  
    if (token) {
      console.log(req);
      
      // Clone the request and add the Authorization header
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(clonedRequest);
    }
  
    // Pass through if no token is available
    return next(req);
  };
