import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ConfigServices } from './config-services';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdottiServices {
  products = signal<any[]>([]);
  loading = signal(false);  // signal per lo spinner

  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  list(nome?: string, artist?: string, family?: string) {
    let params = new HttpParams();
    if (nome) params = params.set('desc', nome);
    if (artist) params = params.set('artist', artist);
    if (family) params = params.set('famiglia', family);
    console.log(nome + "/" + artist + "/" + family);
    this.loading.set(true)
    this.http.get(this.config.backendURL() + "prodotto/list", { params })
      .subscribe({
        next: ((r: any) => this.products.set(r)),
        complete: () => this.loading.set(false)
      })
  }
  getProduct(id: any) {
    let params = new HttpParams().set("id", id);
    return this.http.get(this.config.backendURL() + "prodotto/getById", {params});
  }

  
  
  addPrezzoStock(body:{}){
    return this.http.post(this.config.backendURL() + "prezzo/addPrezzoStock" , body)
    .pipe(tap(() => this.list()));
  }

  deletePrezzo(id:any){
    let params = new HttpParams().set("id", id);
    return this.http.delete(this.config.backendURL() + "prezzo/delete", {params} )
      .pipe(tap(() => this.list()));
  }
}
