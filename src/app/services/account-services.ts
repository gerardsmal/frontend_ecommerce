import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ConfigServices } from './config-services';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountServices {
  accounts = signal<any[]>([]);
  loading = signal(false);  // signal per lo spinner

  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  login(body: {}) {
    return this.http.post(this.config.backendURL() + "account/login", body);
  }

  create(body: {}) {
    return this.http.post(this.config.backendURL() + "account/create", body)
      .pipe(tap(() => this.list()));          // use to update signal
  }

  update(body: {}) {
    return this.http.put(this.config.backendURL() + "account/update", body)
      .pipe(tap(() => this.list()));          // use to update signal
  }

  delete(id:any) {
    return this.http.delete(this.config.backendURL() + "account/delete/" + id)
      .pipe(tap(() => this.list()));          // use to update signal
  }

  list(nome?: string, cognome?: string, role?: string) {  //? optional
    let params = new HttpParams();
    if (nome) params = params.set('nome', nome);
    if (cognome) params = params.set('cognome', cognome);
    if (role) params = params.set('role', role);

    this.loading.set(true);
    this.http.get(this.config.backendURL() + "account/list", { params })
      .subscribe({
        next: ((r: any) => this.accounts.set(r)),
        complete: () => this.loading.set(false)
      })

  }
}
