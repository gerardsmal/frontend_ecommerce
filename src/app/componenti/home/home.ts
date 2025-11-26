import { Component, inject, OnInit } from '@angular/core';
import { FamigliaServices } from '../../services/famiglia-services';
import { ArtistiServices } from '../../services/artisti-services';
import { ProdottiServices } from '../../services/prodotti-services';
import { MatDialog } from '@angular/material/dialog';
import { ProdottoDetaglio } from '../../dialogs/prodotto-detaglio/prodotto-detaglio';
import { AddRowConfirm } from '../../dialogs/add-row-confirm/add-row-confirm';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  nome: any | null = null;
  genere: any = null;
  artist: any = null;

  readonly dialog = inject(MatDialog);

  
  constructor(
    private familySevices: FamigliaServices,
    private artistiServices: ArtistiServices,
    public prodottiServices: ProdottiServices
  ) {
  }
  ngOnInit(): void {
    this.familySevices.list();
    this.artistiServices.list();
    this.prodottiServices.list();
  }

  get families() {
    return this.familySevices.families();
  }

  get artisti() {
    return this.artistiServices.artisti();
  }

  get products() {
    return this.prodottiServices.products();
  }
  applicaFiltri() {
    this.prodottiServices.list(this.nome, this.artist, this.genere);
  }

  selectProd(prod:any){
   
    this.prodottiServices.getProduct(prod.id)
      .subscribe({
        next:((r:any) => {
          this.callDialog(r);
        })
      })
  }

   private callDialog(prod: any) {
   
       const dialogRef = this.dialog.open(ProdottoDetaglio, {
         width: '1100px',
         maxWidth: '90vw',
         height: 'auto',
         maxHeight: '90v',
         enterAnimationDuration: '500ms',
         exitAnimationDuration: '500ms',
         data: { prodotto: prod },
         panelClass: 'wide-dialog'   // puoi usare una classe personalizzata per stili extra
       });
      
       dialogRef.afterClosed()
        .subscribe(r => {
          if (r != null){
            const dialogConfirm = this.dialog.open(AddRowConfirm, {
              data: { msg: r },
              width: '400px',
              maxWidth: '90vw'
            });
          }
        })
     }
   

}
