import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog/login-dialog';
import { AccountServices } from '../../services/account-services';
import { ChangePassword } from '../../dialogs/change-password/change-password';
import { Utilities } from '../../services/utilities';
import { RegistrazioneDialog } from '../../dialogs/registrazione-dialog/registrazione-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  readonly dialog = inject(MatDialog);
  constructor(public auth: AuthService,
    private accountServices: AccountServices,
    private util: Utilities,
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
  changePwd() {
    this.dialog.open(ChangePassword, {
      width: '400px',
      disableClose: false,
      data: {}
    });
  }

  profile() {
    this.accountServices.getAccount(this.auth.grant().userId)
      .subscribe({
        next: ((r: any) => {
          this.util.openDialog(RegistrazioneDialog,
            {
              account: r,
              mode: "U"
            },
            {
              width: '90vw',
              maxWidth: '1200px',
              height: 'auto',
            }
          );
        }),
        error: ((r: any) => {
          console.log("error getAccount:" + r.error.msg);
        })
      })
  }

  resendMail(){
    this.accountServices.resendEmailValidation(this.auth.grant().userId)
      .subscribe((r:any) => {
        console.log("mail inviato:" + r.msg);
      })

  }
}
