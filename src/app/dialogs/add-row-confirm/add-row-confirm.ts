import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-row-confirm',
  standalone: false,
  templateUrl: './add-row-confirm.html',
  styleUrl: './add-row-confirm.css',
})
export class AddRowConfirm {
   
  msg:any = '';
   constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddRowConfirm>
  ) {
    if (data) {
      this.msg = data.msg;
    }

  }
 onCarrello(){
    this.dialogRef.close('carrello')
 }
}
