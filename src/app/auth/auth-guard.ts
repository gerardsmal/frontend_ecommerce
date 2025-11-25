import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAutentificated()) {
    return true;
  }
  return router.parseUrl('/dash/home');
};

