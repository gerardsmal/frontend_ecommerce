import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ConfigServices } from './config-services';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArtistiServices {
  artisti = signal<any[]>([]);
  loading = signal(false);  // signal per lo spinner
  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  list(nome?: string, idFamigia?: any) {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (idFamigia) params = params.set('famiglia', idFamigia);

    this.loading.set(true);
    this.http.get(this.config.backendURL() + "artist/listWeb", { params })
      .subscribe({
        next: ((r: any) => this.artisti.set(r)),
        complete:() => this.loading.set(false)
      })

  }
  getArtist(id: any) {
    let params = new HttpParams();
    if (id) params = params.set('id', id);

    return this.http.get(this.config.backendURL() + "artist/listArtistbyId", { params });
  }

  update(body: {}) {
    return this.http.put(this.config.backendURL() + "artist/update", body)
      .pipe(tap(() => this.list()));
  }
  create(body: {}) {
    return this.http.post(this.config.backendURL() + "artist/create", body)
      .pipe(tap(() => this.list()));
  }

  remove(idArtista: any) {
    return this.http.delete(this.config.backendURL() + "artist/delete/" + idArtista)
      .pipe(tap(() => this.list()));
  }

  removeFamiglia(idArtista: any, idFamiglia: any) {
    return this.http.delete(this.config.backendURL() + "artist/removeFamiglia/" + idArtista + "/" + idFamiglia)
      .pipe(tap(() => this.list()));
  }
}
