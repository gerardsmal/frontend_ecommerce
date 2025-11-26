import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ConfigServices } from './config-services';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FamigliaServices {
  
  families = signal<any[]>([]);
  loading = signal(false);  // signal per lo spinner

  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  list(pattern?:string){
    let params = new HttpParams();
    if (pattern) params = params.set('pattern', pattern);

    this.loading.set(true)
    this.http.get(this.config.backendURL() + "famiglia/list", {params})
      .subscribe({
        next: ((r:any) => this.families.set(r)),
        complete: () => this.loading.set(false)
      })


  }
  create(body:{}){
    return this.http.post(this.config.backendURL() + "famiglia/create", body)
      .pipe(tap(() => this.list()))
  }

  update(body:{}){
    return this.http.put(this.config.backendURL() + 'famiglia/update', body)
      .pipe(tap(() => this.list()))
  }
  
  delete(id:any){
    return this.http.delete(this.config.backendURL() + "famiglia/delete/" + id)
      .pipe(tap(() => this.list()))
  }
 }
