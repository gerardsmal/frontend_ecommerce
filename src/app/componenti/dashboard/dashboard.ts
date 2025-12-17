import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog/login-dialog';
import { AccountServices } from '../../services/account-services';
import { ChangePassword } from '../../dialogs/change-password/change-password';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  readonly dialog = inject(MatDialog);
  constructor(public auth: AuthService,
    private account:AccountServices,
    private routing: Router
  ) { }

 
  login() {
    this.dialog.open(LoginDialog, {
      width: '400px',
      disableClose: false,
      data: {}
    });
  }

  logout() {
    console.log('logout')
    this.auth.resetAll();
    this.routing.navigate(['/dash']);
  }
  changePwd(){
     this.dialog.open(ChangePassword, {
      width: '400px',
      disableClose: false,
      data: {}
    });
  }
}
