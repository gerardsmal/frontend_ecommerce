import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtistiServices } from '../../services/artisti-services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FamigliaServices } from '../../services/famiglia-services';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-artist-update',
  standalone: false,
  templateUrl: './artist-update.html',
  styleUrl: './artist-update.css',
})
export class ArtistUpdate implements OnInit {
  mod: any;
  artist = signal<any>(null);
  newgenere: any;

  readonly dialog = inject(MatDialog);


  msg = signal('');

  updateForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    newgenere: new FormControl()
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private artistService: ArtistiServices,
    private familySevices: FamigliaServices,
    private dialogRef: MatDialogRef<ArtistUpdate>
  ) {
    if (data) {
      this.artist.set(data.artist)
      this.mod = data.mod
    }

  }
  ngOnInit(): void {
    this.familySevices.list();
    if (this.mod == 'U') {
      this.updateForm.patchValue({
        nome: this.artist().nome
      })
    }


  }
  get families() {
    return this.familySevices.families();
  }

  onSubmit(){
    if (this.mod == 'U') this.onUpdate(); 
    if (this.mod == 'C') this.onCreate(); 
  }
  onCreate(){
    this.msg.set('');
    if (!this.updateForm.value.newgenere){
      this.msg.set("definire un genere.")
      return;
    }
    this.artistService.create({
      nome: this.updateForm.value.nome,
      idFamiglia:this.updateForm.value.newgenere
    }).subscribe({
      next:((r:any) => {
        console.log(r);
        this.dialogRef.close();
      }), 
      error:((r:any) => {
        this.msg.set(r.error.msg);
      })
    })

  
  }

  onUpdate() {
    this.msg.set('');
    const updateBody: any = { id: this.artist().id };

    if (this.updateForm.controls['nome'].dirty)
      updateBody.nome = this.updateForm.value.nome;

    if (this.updateForm.controls['newgenere'].dirty)
      updateBody.idFamiglia = this.updateForm.value.newgenere;

    console.log(updateBody);

    this.artistService.update(updateBody)
      .subscribe({
        next: ((r: any) => {
          console.log(r);
          this.dialogRef.close();
        }),
        error: ((r: any) => {
          this.msg.set(r.error.msg);
        })
      })
  }

  remove() {
    const dialogConfirm = this.dialog.open(ConfirmDialog);
    dialogConfirm.afterClosed()
      .subscribe(r => {
        if (r == 'si') this.removeAction(this.artist().id);
      })
  }

  removeAction(id:any){
    this.artistService.remove(id)
      .subscribe({
        next:((r:any) => {
          console.log(r);
          this.dialogRef.close();
        }),
        error:((r:any) => {
          this.msg.set(r.error.msg)
        })
      })


  }
  onSelectedFam(fam: any) {
    console.log(fam);
    const dialogConfirm = this.dialog.open(ConfirmDialog);
    dialogConfirm.afterClosed()
      .subscribe(r => {
        if (r == 'si') this.removeFamilyAction(fam.id);
      })
  }
  removeFamilyAction(idFamiglia: any) {
    this.artistService.removeFamiglia(this.artist().id, idFamiglia)
      .subscribe({
        next: ((r: any) => {
          this.artistService.getArtist(this.artist().id)
            .subscribe({
              next: ((resp: any) => {
                this.artist.set(resp);
              }),
              error: ((resp: any) => {
                this.msg.set(resp.error.msg);
              })
            })
        }),
        error: ((r: any) => {
          this.msg.set(r.error.msg);
        })
      })
  }
}
