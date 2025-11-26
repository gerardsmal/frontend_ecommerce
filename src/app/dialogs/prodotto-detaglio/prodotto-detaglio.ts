import { Component, inject, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProdottiServices } from '../../services/prodotti-services';
import { AuthService } from '../../auth/auth-service';
import { LoginDialog } from '../login-dialog/login-dialog';
import { CarrelloServices } from '../../services/carrello-services';

@Component({
  selector: 'app-prodotto-detaglio',
  standalone: false,
  templateUrl: './prodotto-detaglio.html',
  styleUrl: './prodotto-detaglio.css',
})
export class ProdottoDetaglio {
  prodotto: any;
  readonly dialog = inject(MatDialog);

  msg = signal('');
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private productServices: ProdottiServices,
    private carrelloServices : CarrelloServices,
    private auth: AuthService,
    private dialogRef: MatDialogRef<ProdottoDetaglio>
  ) {
    if (data) {
      this.prodotto = data.prodotto;
      this.msg.set("");
    }
  }
  aggiungiCarello(prezzo: any) {
    this.msg.set("");
    console.log(prezzo)
    console.log("Userid:" + this.auth.grant().userId);
    if (this.auth.grant().userId == null) {
      const dialogLogin = this.dialog.open(LoginDialog, {
        width: '400px',
        disableClose: false,
        data: {}
      });
      dialogLogin.afterClosed()
        .subscribe((r => {
          if (r) {
            console.log("Loggato :" + this.auth.grant().userId);
            this.addRiga(prezzo);
          }
        }))       
    } else {
      this.addRiga(prezzo);
    }
  }
  addRiga(prezzo:any){
    this.carrelloServices.addRiga({
      accountID : this.auth.grant().userId,
      supporto : prezzo.supporto,
      quantita: 1,
      idProdotto: this.prodotto.id
    }) .subscribe({
      next:((r:any) => {
        this.auth.setCarelloSize(r.result)
        this.dialogRef.close(r.msg);
        
      }), 
      error:((r:any) => {
        this.msg.set(r.error.msg)
      })
    })
  }
}
