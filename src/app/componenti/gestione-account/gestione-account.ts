import { Component, inject, OnInit } from '@angular/core';
import { AccountServices } from '../../services/account-services';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '../../dialogs/account/account';

@Component({
  selector: 'app-gestione-account',
  standalone: false,
  templateUrl: './gestione-account.html',
  styleUrl: './gestione-account.css',
})
export class GestioneAccount implements OnInit {
  nome: any = null;
  cognome: any = null;
  role: any = null;
  

  readonly dialog = inject(MatDialog);

  constructor(public accountServices: AccountServices) { }

  // 👇 Leggi il segnale come getter
  get accounts() {
    return this.accountServices.accounts();
  }

  ngOnInit(): void {
    this.accountServices.list();
  }

  search() {
    if (this.role == 'Role') this.role = null;
    console.log(this.nome + "/" + this.cognome + "/" + this.role);
    this.accountServices.list(this.nome, this.cognome, this.role);
  }

  onSelectedAccount(acc: any) {
    console.log(acc);

    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';

    const dialogRef = this.dialog.open(Account, {
      width: '90vw',              // 👈 90% della larghezza della finestra
      maxWidth: '1200px',         // 👈 limite massimo
      enterAnimationDuration,
      exitAnimationDuration,
      data: { account: acc },
      panelClass: 'wide-dialog'
    });



  }

 



}
