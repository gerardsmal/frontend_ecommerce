import { Component, inject, OnInit, signal } from '@angular/core';
import { OrderServices } from '../../services/order-services';
import { AuthService } from '../../auth/auth-service';
import { ComponentType } from '@angular/cdk/overlay';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OrderDetails } from '../../dialogs/order-details/order-details';

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

  readonly dialog = inject(MatDialog);
  constructor(
    private orderServices:OrderServices,
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
    const dialogRef = this.openDialog(OrderDetails, {
              order: order
            });

  }

   /**
   * chiamate generalizzato d'un dialog usando generics di Typescript
   * T = tipo del componente del dialog
   * D = tipo dei dati passati (data)
   * R = tipo del valore ritornato da afterClosed()
   */
  private openDialog<T, D = any, R = any>(
    component: ComponentType<T>,
    data?: D,
    config?: MatDialogConfig<D>
  ): MatDialogRef<T, R> {

    const baseConfig: MatDialogConfig<D> = {
      width: '1100px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '200vh',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      panelClass: 'wide-dialog',
      data
    };

    return this.dialog.open<T, D, R>(component, {
      ...baseConfig,
      ...config   // se vuoi sovrascrivere qualcosa di specifico
    });
  }
  //////
}
