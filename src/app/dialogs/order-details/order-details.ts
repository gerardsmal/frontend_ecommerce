import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails {
   order:any=null; 
   constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<OrderDetails>
  ) {
    if (data) {
      this.order = data.order;
      console.log(this.order)
    }

  }

}
