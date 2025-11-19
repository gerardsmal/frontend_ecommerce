import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtistiServices } from '../../services/artisti-services';
import { FamigliaServices } from '../../services/famiglia-services';
import { AddSupporto } from '../add-supporto/add-supporto';
import { ProdottiServices } from '../../services/prodotti-services';

@Component({
  selector: 'app-prodotti-update',
  standalone: false,
  templateUrl: './prodotti-update.html',
  styleUrl: './prodotti-update.css',
})
export class ProdottiUpdate implements OnInit {
  mod: any;
  prodotto: any;

  readonly dialog = inject(MatDialog);
  genere: any;
  artist: any;
  msg = signal('');

  updateForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    genere: new FormControl(null, Validators.required),
    artist: new FormControl(null, Validators.required)
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private artistService: ArtistiServices,
    private familySevices: FamigliaServices,
    private productServices : ProdottiServices,
    private dialogRef: MatDialogRef<ProdottiUpdate>
  ) {
    console.log("constructor")
    if (data) {
      this.prodotto=data.prodotto;
      this.mod = data.mod
    }

  }
  ngOnInit(): void {
    console.log("init:" + this.mod);
    this.familySevices.list();
    this.artistService.list();

    if (this.mod == 'U') {
      this.updateForm.patchValue({
        nome: this.prodotto.descrizione,
        genere: this.prodotto.famiglia.id,
        artist: this.prodotto.artista.id
      })
    }
  }

  get families() {
    return this.familySevices.families();
  }
  get artisti() {
    return this.artistService.artisti();
  }

  onSubmit(){
  }
  
  onSelectedPrezzo(pr:any){
    console.log(pr)
    this.callDialog(this.prodotto,  pr, 'U');
  }

  addSupport(){
    this.callDialog(this.prodotto,null, 'C');
  }

  remove(){

  }

  private callDialog(prod:any,prez: any, modalita: any) {
  
      const enterAnimationDuration: string = '500ms';
      const exitAnimationDuration: string = '500ms';
  
      const dialogRef = this.dialog.open(AddSupporto, {
        width: '600px',             // larghezza più contenuta
        maxWidth: '90vw',           // massimo rispetto alla viewport
        enterAnimationDuration: '500ms',
        exitAnimationDuration: '500ms',
        data: { product:prod, prezzo: prez, mod: modalita },
        panelClass: 'wide-dialog'   // puoi usare una classe personalizzata per stili extra
      });
      dialogRef.afterClosed()
      .subscribe(r => {
        if (r == 'ok') {
          this.productServices.getProduct(prod.id)
            .subscribe((r:any) => {
              this.prodotto=r;
              console.log(this.prodotto);
            })
        }
      })
    }
  
}
