import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtistiServices } from '../../services/artisti-services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-artist-update',
  standalone: false,
  templateUrl: './artist-update.html',
  styleUrl: './artist-update.css',
})
export class ArtistUpdate implements OnInit{
 mod: any;
 artist:any;
 

 readonly dialog = inject(MatDialog);


  msg = signal('');

updateForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required)
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private artistService: ArtistiServices,
    private dialogRef: MatDialogRef<ArtistUpdate>
  ) {
    if (data) {
      this.artist = data.artist
      this.mod = data.mod
    }

  }
  ngOnInit(): void {
    console.log("id:" + this.artist.id)
      this.updateForm.patchValue({
            nome:this.artist.nome
          })

  }

  onSubmit(){

  }

}
