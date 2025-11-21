import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../dialogs/login-dialog/login-dialog';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  if (authService.isAutentificated()) {
    return true;
  } else {
    authService.redirectUrl = state.url;   // save url dove l'utente voleva andare.
    dialog.open(LoginDialog), {
      width: '400px',
      disableClose: true
    }


    return false;
  }

};
