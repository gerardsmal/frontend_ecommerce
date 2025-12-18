import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountServices } from '../../services/account-services';
import { AuthService } from '../../auth/auth-service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrazioneDialog } from '../registrazione-dialog/registrazione-dialog';
import { Utilities } from '../../services/utilities';


@Component({
  selector: 'app-login-dialog',
  standalone: false,
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.css',
})
export class LoginDialog {
  msg = signal('');
  readonly dialog = inject(MatDialog);

  constructor(
    private account: AccountServices,
    private auth: AuthService,
    private routing: Router,
    private util: Utilities,
    private dialogRef: MatDialogRef<LoginDialog>
  ) { }

  onSubmit(signin: NgForm) {
    this.account.login({
      userName: signin.form.value.userName,
      password: signin.form.value.password
    }).subscribe({
      next: (resp: any) => {
        this.msg.set("");
        this.auth.setAutentificated(resp.userID, resp.userName, resp.carrelloSize, resp.orderSize);
        if (resp.role == 'ADMIN') this.auth.setAdmin();
        if (resp.role == 'USER') this.auth.setUser();

        console.log('[LoginDialog] dopo login, isAutentificated =', this.auth.isAutentificated());

        this.dialogRef.close(true);
        this.routing.navigate(['/dash']);
      },
      error: (resp: any) => {
        console.log(resp);
        this.msg.set(resp.error);
      }
    });
  }


  registrazione() {
    this.util.openDialog(RegistrazioneDialog,
      {
        account: null,
        mode: "C"
      }, 
      {
        width: '90vw',
        maxWidth: '1200px',
        height: 'auto',
      }
    );
  }

}
