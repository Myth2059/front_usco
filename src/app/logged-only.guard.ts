import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.services';
import { CookieService } from 'ngx-cookie-service';
import { UserServices } from './services/user.services';

export const loggedOnlyGuard: CanActivateFn = (route, state) => {
const authService = inject(AuthService);
return authService.getAuthToken();
  
};

export const loginGuard = () =>{
  const router = inject(Router);
  const userServices = inject(UserServices);

  if (userServices.isLogged()) {
    return true;
  }else{
    router.navigate(["/login"]);
    return false;
  }
}