import { Component, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { sign } from 'node:crypto';
import { AccountServices } from '../../services/account-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  msg = signal('');

  constructor(private account: AccountServices,
    private routing: Router
  ) { }

  onSubmit(register: NgForm) {
    this.msg.set("");

    if (register.form.value.password != register.form.value.passwordControl) {
      this.msg.set("passord non identiche")
      return;
    }
    this.account.create({
      nome:register.form.value.nome,
      cognome:register.form.value.cognome,
      email:register.form.value.email,
      sesso: register.form.value.sesso == 1 ? true : false,
      telefono: register.form.value.telefono,
      via: register.form.value.via,
      commune: register.form.value.comune,
      cap: register.form.value.cap,
      userName:register.form.value.userName,
      pwd: register.form.value.password,
      role: 'USER'
    }).subscribe({
      next:((resp:any) => {
        console.log(resp);
        this.routing.navigate(['/login']);
      }),
      error:((resp:any) => {
        console.log(resp.error.msg)
        this.msg.set(resp.error.msg);
      })
    })


  }

  
  back(){
    this.routing.navigate(['/login']);
  }
}

