import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ConfigServices } from './config-services';
import { ProdottiServices } from './prodotti-services';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadServices {

  
   constructor(private http: HttpClient,
    private config: ConfigServices,
    private prod: ProdottiServices
  ) { }


  upload(file: File, id:any){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);

    return this.http.post(this.config.backendURL() + "upload/image" , formData)
      .pipe(tap(() => this.prod.list()))

  }

  getUrl(name:string){
     let params = new HttpParams().set("filename",name);
    return this.http.get(this.config.backendURL() + "upload/getUrl", {params});
  }
}
