import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServices } from '../../services/account-services';
import { ConfigServices } from '../../services/config-services';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  msg = signal('');

  constructor(private routing:Router,
              private account:AccountServices,
              private auth:AuthService
              
  ){ 
  }
  
  onSubmit(signin: NgForm){
    this.account.login({
      userName: signin.form.value.userName,
      password: signin.form.value.password
    }).subscribe({
      next:((resp:any) => {
        this.msg.set("");
        console.log(resp)
        this.auth.setAutentificated(resp.userID, resp.userName);
        if (resp.role == 'ADMIN')
          this.auth.setAdmin();
        if (resp.role == 'USER')
          this.auth.setUser();
        this.routing.navigate(['/dash'])


      }),
      error:((resp:any) => {
        console.log(resp);
        this.msg.set(resp.error);
      })
    }

    )
  }

  registrazione(){
    this.routing.navigate(['/register'])
  }
}
