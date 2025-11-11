import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  standalone: false,
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {

  constructor(
      private dialogRef:MatDialogRef<ConfirmDialog>
  ){}

  optionSelected(opt:string){
    this.dialogRef.close(opt);
  }

}
