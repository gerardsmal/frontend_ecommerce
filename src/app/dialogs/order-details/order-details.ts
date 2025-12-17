import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderServices } from '../../services/order-services';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.html',
  styleUrl: './order-details.css',
})
export class OrderDetails {
   order:any=null; 
   history = signal(false)
   constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<OrderDetails>,
    private orderServices:OrderServices
  ) {
    if (data) {
      this.order = data.order;
      this.history.set(data.history); 
      console.log(this.order)
    }

  }
  invioMail(){
    this.orderServices.orderDetails(this.order.id)
      .subscribe({
        next:((r:any) => {
          this.history.set(false);
        }),
        error:((r:any) => {
          console.log("error in orderDetails:" + r.error.msg);
        })
      })
  }

}
