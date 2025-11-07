import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  constructor(public auth:AuthService,
              private routing:Router
  ){}
 
  login(){
    this.routing.navigate(['/login']);
  }

  logout(){
    console.log('logout')
    this.auth.resetAll();
    this.routing.navigate(['/dash']);
  }
}
