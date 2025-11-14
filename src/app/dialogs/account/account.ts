import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountServices } from '../../services/account-services';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account implements OnInit {
  account: any;
  mod: any;
  updateForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    sesso: new FormControl(null, Validators.required),
    telefono: new FormControl(null, Validators.required),
    via: new FormControl(null, Validators.required),
    comune: new FormControl(null, Validators.required),
    cap: new FormControl(null, Validators.required),
    userName: new FormControl(null),
    password: new FormControl(null),
    passwordControl: new FormControl(null),
    role: new FormControl(null, Validators.required),
    stato: new FormControl(null, Validators.required)
  })

  readonly dialog = inject(MatDialog);


  msg = signal('');
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private accoutServices: AccountServices,
    private dialogRef: MatDialogRef<Account>
  ) {
    if (data) {
      this.account = data.account
      this.mod = data.mod
    }

  }
  ngOnInit(): void {
    console.log("modalita:" + this.mod)
    if (this.mod == 'U') {
      this.updateForm.patchValue({
        nome: this.account.nome,
        cognome: this.account.cognome,
        email: this.account.email,
        sesso: this.account.sesso,
        telefono: this.account.telefono,
        via: this.account.via,
        comune: this.account.commune,
        cap: this.account.cap,
        userName: this.account.userName,
        role: this.account.role,
        stato : this.account.status == 'Attivo' ? true : false
      })

    } else{
      this.updateForm.patchValue({
        sesso:'M',
        role:"USER"
      })
    }
  }
  onSubmit(){
    if (this.mod == 'U') this.onUpdate();
    if (this.mod == 'C') this.onCreate();

  }
  onUpdate() {
    if (this.updateForm.controls['password'].dirty) {
      if (this.updateForm.value.password != this.updateForm.value.passwordControl) {
        this.msg.set("passord non coindicidenti");
        return;
      }
    }
    this.msg.set('');
    const updateBody: any = { id: this.account.id };

    if (this.updateForm.controls['password'].dirty)
      updateBody.pwd = this.updateForm.value.password;

    if (this.updateForm.controls['nome'].dirty)
      updateBody.nome = this.updateForm.value.nome;

    if (this.updateForm.controls['cognome'].dirty)
      updateBody.cognome = this.updateForm.value.cognome;

    if (this.updateForm.controls['email'].dirty)
      updateBody.email = this.updateForm.value.email;

    if (this.updateForm.controls['sesso'].dirty)
      updateBody.sesso = this.updateForm.value.sesso == 'M' ? true : false;

    if (this.updateForm.controls['telefono'].dirty)
      updateBody.telefono = this.updateForm.value.telefono;

    if (this.updateForm.controls['via'].dirty)
      updateBody.via = this.updateForm.value.via;

    if (this.updateForm.controls['comune'].dirty)
      updateBody.commune = this.updateForm.value.comune;

    if (this.updateForm.controls['password'].dirty)
      updateBody.pwd = this.updateForm.value.password;

    if (this.updateForm.controls['cap'].dirty)
      updateBody.cap = this.updateForm.value.cap;

    if (this.updateForm.controls['userName'].dirty)
      updateBody.userName = this.updateForm.value.userName;

    if (this.updateForm.controls['role'].dirty)
      updateBody.role = this.updateForm.value.role;

    if (this.updateForm.controls['stato'].dirty)
      updateBody.status = this.updateForm.value.stato;

    console.log(updateBody);

    this.accoutServices.update(updateBody)
      .subscribe({
        next: ((resp: any) => {
          console.log(resp);
          this.dialogRef.close();
        }),
        error: ((resp: any) => {
          this.msg.set(resp.error.msg);
        })
      })
  }
  onCreate() {
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
      role: this.updateForm.value.role
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
  remove() {
    const dialogConfirm = this.dialog.open(ConfirmDialog);
    dialogConfirm.afterClosed()
      .subscribe(r => {
        if (r == 'si') this.removeAction();
      })
  }

  removeAction() {
    this.accoutServices.delete(this.account.id)
      .subscribe({
        next: ((resp: any) => {
          console.log(resp);
          this.dialogRef.close();

        }),
        error: ((resp: any) => {
          this.msg.set(resp.error.msg);
        })
      })
  }
}


