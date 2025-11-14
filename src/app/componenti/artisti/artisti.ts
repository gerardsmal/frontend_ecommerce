import { Component, inject, OnInit } from '@angular/core';
import { FamigliaServices } from '../../services/famiglia-services';
import { ArtistiServices } from '../../services/artisti-services';
import { MatDialog } from '@angular/material/dialog';
import { ArtistUpdate } from '../../dialogs/artist-update/artist-update';

@Component({
  selector: 'app-artisti',
  standalone: false,
  templateUrl: './artisti.html',
  styleUrl: './artisti.css',
})
export class Artisti implements OnInit {
  nome: any = null;
  genere: any = null;

  readonly dialog = inject(MatDialog);

  constructor(private familySevices: FamigliaServices,
    public artistiServices: ArtistiServices
  ) { }


  ngOnInit(): void {
    this.familySevices.list();
    this.artistiServices.list();
  }

  get families() {
    return this.familySevices.families();
  }

  get artisti() {
    return this.artistiServices.artisti();
  }


  create() {
    this.callDialog(null, 'C');
  }

  search() {
    this.artistiServices.list(this.nome, this.genere);
  }

  onSelectedArtist(art: any) {
    console.log(art)
    this.artistiServices.getArtist(art.id)
      .subscribe({
        next: ((r: any) => {

          this.callDialog(r, 'U');

        }),
        error: ((r: any) => {
          console.log("error:" + r.error.msg)
        })
      })






  }

  private callDialog(art: any, modalita: any) {

    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';

    const dialogRef = this.dialog.open(ArtistUpdate, {
      width: '600px',             // larghezza più contenuta
      maxWidth: '90vw',           // massimo rispetto alla viewport
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: { artist: art, mod: modalita },
      panelClass: 'wide-dialog'   // puoi usare una classe personalizzata per stili extra
    });



  }

}
