import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServices } from './config-services';

@Injectable({
  providedIn: 'root',
})
export class AccountServices {
 
  constructor(private http:HttpClient,
        private config:ConfigServices
  ){}

  login(body:{}){
    return this.http.post(this.config.backendURL()  + "account/login", body);
  }

  create(body:{}){
    return this.http.post(this.config.backendURL() + "account/create", body);
  }
}
