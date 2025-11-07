import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  account:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:any,
    private dialogRef :MatDialogRef<Account>
  ){
    if (data){
      this.account = data.account
    }

  }

}
