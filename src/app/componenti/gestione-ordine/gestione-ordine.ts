import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderServices } from '../../services/order-services';
import { AuthService } from '../../auth/auth-service';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OrderDetails } from '../../dialogs/order-details/order-details';
import { Utilities } from '../../services/utilities';

@Component({
  selector: 'app-gestione-ordine',
  standalone: false,
  templateUrl: './gestione-ordine.html',
  styleUrl: './gestione-ordine.css',
})
export class GestioneOrdine implements OnInit{
  nome:any;
  artista:any;
  genere:any;
  accountId:any;
  ordini = signal<any[]>([]);

 // readonly dialog = inject(MatDialog);
  constructor(
    private orderServices:OrderServices,
    private util:Utilities,
    private auth:AuthService
  ){}

  ngOnInit(): void {
    this.accountId = this.auth.grant().userId;
    this.orderServices.list(this.accountId)
      .subscribe({
        next:((r:any) => {
          this.ordini.set(r);
        }),
        error:((r:any) => {
          console.log("errore in caricamento ordini:" + r.error.msg);
        })
      })
  }

  search(){
    this.orderServices.list(this.accountId,this.nome,this.artista, this.genere)
      .subscribe({
        next:((r:any) => {
          this.ordini.set(r);
        }),
        error:((r:any) => {
          console.log("errore in caricamento ordini:" + r.error.msg);
        })
      })
  }

  onSelectedOrdine(order:any){
    console.log(order)
    const dialogRef = this.util.openDialog(OrderDetails, {
              order: order,
              history:true
            });

  }

}
