import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ConfigServices } from './config-services';

@Injectable({
  providedIn: 'root',
})
export class FamigliaServices {
  families = signal<any[]>([]);

  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

  list(pattern?:string){
    let params = new HttpParams();
    if (pattern) params = params.set('pattern', pattern);

    this.http.get(this.config.backendURL() + "famiglia/list", {params})
      .subscribe({
        next: ((r:any) => this.families.set(r))
      })

  }

}
