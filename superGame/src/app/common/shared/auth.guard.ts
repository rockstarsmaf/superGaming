import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const authGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let auth = inject(AuthService);
  let url = state.url;
  url = url.replace(/\//g, "");
  // check if logged in and not allow user to log in page
  if (auth.checkIsLoggedIn()) {
    if (url === '') {
      _router.navigate(['/units']);
    } else {
      return true;
    }
  }
  // if not logged in or no access token, redirecT to login page
  else {
    if (url === 'units' || url === 'sales') {
      _router.navigate(['']);
    }
    else {
      return true;
    }
  }
  return false;
}
