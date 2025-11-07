import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigServices {
  private url="config.json";
  
  public backendURL = signal<string | null>(null);

  constructor(private http:HttpClient){}

  getConfig(){
    return this.http.get(this.url);
  }

  loadURL(){
    if (this.backendURL() == null){
      this.getConfig().subscribe((r:any) => {
        this.backendURL.set(r.urlConfig)
      })
    }
  }
}
