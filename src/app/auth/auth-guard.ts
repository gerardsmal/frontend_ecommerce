import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth-service';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LoginDialog } from '../dialogs/login-dialog/login-dialog';

export const authGuard: CanActivateFn = (route, state)
  : boolean | UrlTree | Observable<boolean | UrlTree> => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(MatDialog);

  console.log('[authGuard] richiesto URL:', state.url, 'isAutentificated=', authService.isAutentificated());

  if (authService.isAutentificated()) {
    console.log('[authGuard] user già loggato, entro diretto in', state.url);
    return true;
  }

  console.log('[authGuard] non loggato, apro dialog per', state.url);


  authService.redirectUrl = state.url;

  // Se la dialog è già aperta, riuso quella (per evitare loop multipli)
  const alreadyOpen = dialog.openDialogs.find(d => d.componentInstance instanceof LoginDialog);
  const dialogRef = alreadyOpen ?? dialog.open(LoginDialog, {
    width: '400px',
    disableClose: false
  });

  return dialogRef.afterClosed().pipe(
    map((result) => {
      console.log('[authGuard] dialog chiusa, result=', result, 'isAutentificated=', authService.isAutentificated());

      if (authService.isAutentificated()) {
        console.log('[authGuard] login OK, permetto accesso a', state.url);
        return true;
      }

      console.log('[authGuard] login NON effettuato, redirect a /dash/home');
      return router.parseUrl('/dash/home');
    })
  )
}
  


