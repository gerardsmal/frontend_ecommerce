import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountServices } from '../../services/account-services';
import { AuthService } from '../../auth/auth-service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrazioneDialog } from '../registrazione-dialog/registrazione-dialog';


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
    private dialogRef: MatDialogRef<LoginDialog>
  ) { }

  onSubmit(signin: NgForm) {
    this.account.login({
      userName: signin.form.value.userName,
      password: signin.form.value.password
    }).subscribe({
      next: ((resp: any) => {
        this.msg.set("");
        console.log(resp)
        this.auth.setAutentificated(resp.userID, resp.userName);
        if (resp.role == 'ADMIN')
          this.auth.setAdmin();
        if (resp.role == 'USER')
          this.auth.setUser();

        const redirect = this.auth.redirectUrl || '/dash/home';
        this.auth.redirectUrl = undefined;
        this.dialogRef.close();
        this.routing.navigateByUrl(redirect);

      }),
      error: ((resp: any) => {
        console.log(resp);
        this.msg.set(resp.error);
      })
    }

    )
  }

  registrazione() {
     const enterAnimationDuration: string = '500ms';
        const exitAnimationDuration: string = '500ms';
    
        const dialogRef = this.dialog.open(RegistrazioneDialog, {
          width: '90vw',              // 👈 90% della larghezza della finestra
          maxWidth: '1200px',         // 👈 limite massimo
          enterAnimationDuration,
          exitAnimationDuration,
          panelClass: 'wide-dialog'
        });
  }

}
