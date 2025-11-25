import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProdottiServices } from '../../services/prodotti-services';
import { AuthService } from '../../auth/auth-service';
import { LoginDialog } from '../login-dialog/login-dialog';

@Component({
  selector: 'app-prodotto-detaglio',
  standalone: false,
  templateUrl: './prodotto-detaglio.html',
  styleUrl: './prodotto-detaglio.css',
})
export class ProdottoDetaglio {
  prodotto: any;
  readonly dialog = inject(MatDialog);
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private productServices: ProdottiServices,
    private auth: AuthService,
    private dialogRef: MatDialogRef<ProdottoDetaglio>
  ) {
    if (data) {
      this.prodotto = data.prodotto;

    }
  }
  aggiungiCarello(prezzo: any) {
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
          }
        }))
        
    }
  }

}
