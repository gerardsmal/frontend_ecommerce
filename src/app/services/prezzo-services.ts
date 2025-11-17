import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigServices } from './config-services';

@Injectable({
  providedIn: 'root',
})
export class PrezzoServices {
  
  constructor(private http: HttpClient,
    private config: ConfigServices
  ) { }

 
}
