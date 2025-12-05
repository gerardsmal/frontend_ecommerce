import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServices } from './config-services';

@Injectable({
  providedIn: 'root',
})
export class OrderServices {

  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  orderStatus(id: any) {
    let params = new HttpParams().set('id', id);
    return this.http.get(this.config.backendURL() + "order/orderStatus", { params });
  }

  init(body: {}) {
    return this.http.post(this.config.backendURL() + "order/init", body);
  }

  listSpedizione(accountID: any) {
    let params = new HttpParams().set('id', accountID);
    return this.http.get(this.config.backendURL() + "order/listSpedizione", { params });
  }

  getSpedizione(id: any) {
    let params = new HttpParams().set('id', id);
    return this.http.get(this.config.backendURL() + "order/getSpedizione", { params });
  }

  createSpedizione(body: any) {
    return this.http.post(this.config.backendURL() + "order/createSpedizione", body);
  }

  create(body: {}) {
    return this.http.post(this.config.backendURL() + "order/create", body);
  }
}
