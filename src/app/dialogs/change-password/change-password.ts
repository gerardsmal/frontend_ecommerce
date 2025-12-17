import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountServices } from '../../services/account-services';
import { AuthService } from '../../auth/auth-service';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  msg = signal('');
  loading = signal(false);
  
  readonly dialog = inject(MatDialog);

  constructor(
    private accountServices: AccountServices,
    private auth: AuthService,
    private routing: Router,
    private dialogRef: MatDialogRef<ChangePassword>
  ) { this.loading.set(false)}

  onSubmit(updatePwd: NgForm) {
    this.msg.set("");  
   
    if (updatePwd.value.newpassword != updatePwd.value.cntrlpassword) {
      this.msg.set("password non identiche.")
      return
    }
    this.loading.set(true);
    this.accountServices.changePwd({
      id:this.auth.grant().userId,
      oldPwd:updatePwd.value.oldpassword,
      newPwd:updatePwd.value.newpassword
    }).subscribe({
      next:((r:any) => {
         this.loading.set(false);
        this.dialogRef.close();  
      }),
      error:((r:any) => {
        this.msg.set(r.error.msg);
      })
    })

  }
}
