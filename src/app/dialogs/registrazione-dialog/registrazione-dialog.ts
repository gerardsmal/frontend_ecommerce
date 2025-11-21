import { Component, Inject, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountServices } from '../../services/account-services';

@Component({
  selector: 'app-registrazione-dialog',
  standalone: false,
  templateUrl: './registrazione-dialog.html',
  styleUrl: './registrazione-dialog.css',
})
export class RegistrazioneDialog {
  account: any;
  mod: any;
  updateForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    sesso: new FormControl('M', Validators.required),
    telefono: new FormControl(null, Validators.required),
    via: new FormControl(null, Validators.required),
    comune: new FormControl(null, Validators.required),
    cap: new FormControl(null, Validators.required),
    userName: new FormControl(null),
    password: new FormControl(null),
    passwordControl: new FormControl(null) 
  })

  


  msg = signal('');
  constructor(
    private accoutServices: AccountServices,
    private dialogRef: MatDialogRef<RegistrazioneDialog>
  ) {}

    onSubmit() {
    this.msg.set("");

    if (this.updateForm.value.password != this.updateForm.value.passwordControl) {
      this.msg.set("passord non coindicidenti");
      return;
    }
    console.log("nome" + this.updateForm.value.nome);
    console.log("cognome" + this.updateForm.value.cognome);

    this.accoutServices.create({
      nome:this.updateForm.value.nome,
      cognome:this.updateForm.value.cognome,
      email:this.updateForm.value.email,
      sesso: this.updateForm.value.sesso == 'M' ? true : false,
      telefono: this.updateForm.value.telefono,
      via: this.updateForm.value.via,
      commune: this.updateForm.value.comune,
      cap: this.updateForm.value.cap,
      userName:this.updateForm.value.userName,
      pwd: this.updateForm.value.password,
      role: 'USER'
    }).subscribe({
      next:((resp:any) => {
        console.log(resp);
        this.dialogRef.close();
      }),
      error:((resp:any) => {
        console.log(resp.error.msg)
        this.msg.set(resp.error.msg);
      })
    })
  }

}
