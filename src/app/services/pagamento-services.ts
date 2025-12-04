import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServices } from './config-services';

@Injectable({
  providedIn: 'root',
})
export class PagamentoServices {
    constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  list(){
    return this.http.get(this.config.backendURL() + "pagamento/list")
  }
  getPagamento(id:any){
    const params = new HttpParams().set("id", id);
    return this.http.get(this.config.backendURL() + "pagamento/getModalita", { params}); 
  }
}
