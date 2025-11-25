import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProdottiServices } from '../../services/prodotti-services';

@Component({
  selector: 'app-prodotto-detaglio',
  standalone: false,
  templateUrl: './prodotto-detaglio.html',
  styleUrl: './prodotto-detaglio.css',
})
export class ProdottoDetaglio {
    prodotto:any;

    constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private productServices: ProdottiServices,
    private dialogRef: MatDialogRef<ProdottoDetaglio>
  ) {
    if (data) {
      this.prodotto = data.prodotto;

    }

  }

}
