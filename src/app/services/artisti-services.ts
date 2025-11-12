import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ConfigServices } from './config-services';

@Injectable({
  providedIn: 'root',
})
export class ArtistiServices {
  artisti = signal<any[]>([]);

  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  list(nome?: string, idFamigia?: any) {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (idFamigia) params = params.set('famiglia', idFamigia);

    this.http.get(this.config.backendURL() + "artist/listWeb", { params })
      .subscribe({
        next: ((r: any) => this.artisti.set(r))
      })

  }
  getArtist(id:any){
    let params = new HttpParams();
    if (id) params = params.set('id', id);
    
    return this.http.get(this.config.backendURL() + "artist/listArtistbyId", { params });
  }

}
