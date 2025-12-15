import { Component, inject, OnInit } from '@angular/core';
import { FamigliaServices } from '../../services/famiglia-services';
import { ArtistiServices } from '../../services/artisti-services';
import { ProdottiServices } from '../../services/prodotti-services';
import { MatDialog } from '@angular/material/dialog';
import { ProdottoDetaglio } from '../../dialogs/prodotto-detaglio/prodotto-detaglio';
import { AddRowConfirm } from '../../dialogs/add-row-confirm/add-row-confirm';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Utilities } from '../../services/utilities';

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

  pageIndex = 0;
  pageSize = 6;

 
  constructor(
    private familySevices: FamigliaServices,
    private artistiServices: ArtistiServices,
    public prodottiServices: ProdottiServices,
    private util:Utilities,
    private rounting:Router
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

  get pagedProducts(){
    const all = this.products ?? [];
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return all.slice(start, end);
  }

  applicaFiltri() {
    this.pageIndex = 0;
    this.prodottiServices.list(this.nome, this.artist, this.genere);
  }

  onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
       const dialogRef = this.util.openDialog(ProdottoDetaglio, {
         prodotto: prod 
        });
       dialogRef.afterClosed()
        .subscribe(r => {
          if (r.length > 0){
            const dialogConfirm = this.util.openDialog(AddRowConfirm, 
              {msg: r },
              {
              width: '400px',
              maxWidth: '90vw'
              }
            );
            dialogConfirm.afterClosed()
              .subscribe(r => {
                if (r == 'carrello') this.rounting.navigate(['dash/carello']);
              } )
          }
        })
     }
   

}
