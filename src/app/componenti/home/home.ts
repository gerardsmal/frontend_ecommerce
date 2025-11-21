import { Component, OnInit } from '@angular/core';
import { FamigliaServices } from '../../services/famiglia-services';
import { ArtistiServices } from '../../services/artisti-services';
import { ProdottiServices } from '../../services/prodotti-services';
import { debounceTime, Subject } from 'rxjs';

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
    console.log(this.nome + "/" + this.genere + "/" + this.artist);
    this.prodottiServices.list(this.nome, this.artist, this.genere);
  }
}
