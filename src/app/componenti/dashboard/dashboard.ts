import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog/login-dialog';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  readonly dialog = inject(MatDialog);
  constructor(public auth:AuthService,
              private routing:Router
  ){}
 
  login(){
  //  this.routing.navigate(['/login']);
    this.dialog.open(LoginDialog, {
    width: '400px',
    disableClose: false,   
    data: {}              
  });
  }

  logout(){
    console.log('logout')
    this.auth.resetAll();
    this.routing.navigate(['/dash']);
  }
 }
