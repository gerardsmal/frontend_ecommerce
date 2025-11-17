import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtistiServices } from '../../services/artisti-services';
import { FamigliaServices } from '../../services/famiglia-services';

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
  }

  addSupport(){
    
  }

  remove(){

  }
}
