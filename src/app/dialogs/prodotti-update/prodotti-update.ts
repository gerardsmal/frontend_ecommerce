import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtistiServices } from '../../services/artisti-services';
import { FamigliaServices } from '../../services/famiglia-services';
import { AddSupporto } from '../add-supporto/add-supporto';
import { ProdottiServices } from '../../services/prodotti-services';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { UploadServices } from '../../services/upload-services';

@Component({
  selector: 'app-prodotti-update',
  standalone: false,
  templateUrl: './prodotti-update.html',
  styleUrl: './prodotti-update.css',
})
export class ProdottiUpdate implements OnInit {
  mod: any = signal("");

  prodotto: any = signal<any>(null);

  readonly dialog = inject(MatDialog);
  genere: any;
  artist: any;
  msg = signal('');
  imageUrl = signal(null);

 fileName: string = '';
  selectedFile: File | null = null;


  updateForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    genere: new FormControl(null, Validators.required),
    artist: new FormControl(null, Validators.required)
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private artistService: ArtistiServices,
    private familySevices: FamigliaServices,
    private productServices: ProdottiServices,
    private uploadServices: UploadServices,
    private dialogRef: MatDialogRef<ProdottiUpdate>
  ) {
    if (data) {
      this.prodotto.set(data.prodotto);
      this.mod.set(data.mod);
    }

  }
  ngOnInit(): void {
    console.log("init:" + this.mod);
    this.familySevices.list();
    this.artistService.list();

    if (this.mod() == 'U') {
      this.updateForm.patchValue({
        nome: this.prodotto().descrizione,
        genere: this.prodotto().famiglia.id,
        artist: this.prodotto().artista.id
      })
      if (this.prodotto().image != null)
        this.imageUrl.set(this.prodotto().image);
    }
  }

  get families() {
    return this.familySevices.families();
  }
  get artisti() {
    return this.artistService.artisti();
  }

  onSubmit() {
    if (this.mod() == 'U') this.onUpdate();
    if (this.mod() == 'C') this.onCreate();
  }

  onUpdate() {
    console.log('onUpdate')
    const updateBody: any = { id: this.prodotto().id }

    if (this.updateForm.controls['nome'].dirty)
      updateBody.descrizione = this.updateForm.value.nome;
    if (this.updateForm.controls['genere'].dirty)
      updateBody.idFamiglia = this.updateForm.value.genere;
    if (this.updateForm.controls['artist'].dirty)
      updateBody.idArtist = this.updateForm.value.artist;
    
    console.log(updateBody)
    this.productServices.update(updateBody)
      .subscribe(({
        next:((r:any) => {
          console.log(r);
          this.dialogRef.close();
        }),
        error: ((r:any) => {
          this.msg.set(r.error.msg);
        })
      }))

  }

  onCreate() {
    console.log('onCreate')
    this.productServices.create({
      descrizione: this.updateForm.value.nome,
      idFamiglia: this.updateForm.value.genere,
      idArtist: this.updateForm.value.artist
    }).subscribe({
      next: ((r: any) => {
        console.log("prodotto creato :" + r.result);
        this.productServices.getProduct(r.result)
          .subscribe({
            next: ((r: any) => {
              this.prodotto.set(r);
              this.mod.set("U")
            }),
            error: ((r: any) => {
              console.log(r.error.msg)
            })
          })



      }),
      error: ((r: any) => {
        this.msg.set(r.error.msg);
      })
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.fileName = '';
      this.selectedFile = null;
      return;
    }

    // Prendi il file selezionato
    this.selectedFile = input.files[0];
    this.fileName = this.selectedFile.name;

    console.log('File selezionato:', this.selectedFile);

    this.onUpload();
   
  }
    onUpload(){
      console.log("upload...");
      this.uploadServices.upload(this.selectedFile!, this.prodotto().id)
        .subscribe({
          next:((r:any) =>{
            console.log(r.msg);
            this.uploadServices.getUrl(r.msg)
              .subscribe({
                next:((r:any) =>{
                  this.imageUrl.set(r.msg);
                })
              })


          }),
          error:((r:any) => {
            console.log(r.error.msg);
          })
        })
    }

  onSelectedPrezzo(pr: any) {
    console.log(pr)
    this.callDialog(this.prodotto(), pr, 'U');
  }

  addSupport() {
    this.callDialog(this.prodotto(), null, 'C');
  }

  remove() {
    const dialogConfirm = this.dialog.open(ConfirmDialog);
    dialogConfirm.afterClosed()
      .subscribe(r => {
        if (r == 'si') this.removeAction(this.prodotto().id);
      })
  }

  removeAction(id: any) {
    this.productServices.delete(id)
      .subscribe({
        next: ((r: any) => {
          this.dialogRef.close();
        }),
        error: ((r: any) => {
          console.log(r.error.msg);
        })
      })
  }

  private callDialog(prod: any, prez: any, modalita: any) {

    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';

    const dialogRef = this.dialog.open(AddSupporto, {
      width: '600px',             // larghezza più contenuta
      maxWidth: '90vw',           // massimo rispetto alla viewport
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { product: prod, prezzo: prez, mod: modalita },
      panelClass: 'wide-dialog'   // puoi usare una classe personalizzata per stili extra
    });
    dialogRef.afterClosed()
      .subscribe(r => {
        if (r == 'ok') {
          this.productServices.getProduct(prod.id)
            .subscribe((r: any) => {
              this.prodotto.set(r);
              console.log(this.prodotto());
            })
        }
      })
  }

}
