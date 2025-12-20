import { Component, inject, OnInit } from '@angular/core';
import { FamigliaServices } from '../../services/famiglia-services';
import { ProdottiServices } from '../../services/prodotti-services';
import { ArtistiServices } from '../../services/artisti-services';
import { MatDialog } from '@angular/material/dialog';
import { ProdottiUpdate } from '../../dialogs/prodotti-update/prodotti-update';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-prodotti',
  standalone: false,
  templateUrl: './prodotti.html',
  styleUrl: './prodotti.css',
})
export class Prodotti implements OnInit {
  nome: any = null;
  genere: any = null;
  artist: any = null;

  pageIndex = 0;
  pageSize = 8;

  constructor(private familySevices: FamigliaServices,
    private artistiServices: ArtistiServices,
    public prodottiServices: ProdottiServices
  ) { }
  readonly dialog = inject(MatDialog);
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

  get pagedProducts() {
    const all = this.products ?? [];
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    return all.slice(start, end);
  }

  search() {
    this.pageIndex = 0;
    this.prodottiServices.list(this.nome, this.artist, this.genere);
  }

  onPageChange(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }


  create() {
    this.callDialog(null, 'C');
  }

  onSelectedProduct(prod: any) {

    console.log("id:" + prod.id)
    this.prodottiServices.getProduct(prod.id)
      .subscribe({
        next: ((r: any) => {
          console.log(r)
          this.callDialog(r, 'U');
        }),
        error: ((r: any) => {
          console.log("error:" + r.error.msg)
        })
      })
  }
  private callDialog(prod: any, modalita: any) {

    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';
    const dialogRef = this.dialog.open(ProdottiUpdate, {
      width: '1100px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '90v',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { prodotto: prod, mod: modalita },
      panelClass: 'wide-dialog'   // puoi usare una classe personalizzata per stili extra
    });
  }
}
