import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServices } from './config-services';

@Injectable({
  providedIn: 'root',
})
export class AccountServices {

  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  login(body: {}) {
    return this.http.post(this.config.backendURL() + "account/login", body);
  }

  create(body: {}) {
    return this.http.post(this.config.backendURL() + "account/create", body);
  }

  list(nome: string, cognome: string, role: string) {
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (cognome) params = params.set('cognome', cognome);
    if (role) params = params.set('role', role);

    return this.http.get(this.config.backendURL() + "account/list", { params})

  }
}
