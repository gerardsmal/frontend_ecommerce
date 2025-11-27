import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServices } from './config-services';
import { AccountServices } from './account-services';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrelloServices {
   constructor(private http: HttpClient,
    private config: ConfigServices,
    private account: AccountServices
  ) { }

  addRiga(body:any){
    return this.http.post(this.config.backendURL() + "carello/addRiga", body)
      .pipe(tap(() => this.account.list()))
  }
  deleteRiga(id:any){
    console.log('deleteRiga:' + id)
    return this.http.delete(this.config.backendURL() + "carello/deleteRiga/" + id);
  }
}

