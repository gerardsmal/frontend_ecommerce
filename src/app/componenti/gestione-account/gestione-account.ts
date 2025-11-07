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
  accounts: any;

  readonly dialog = inject(MatDialog);

  constructor(private accountServices: AccountServices) { }

  ngOnInit(): void {
    this.listAccount();
  }

  search() {
    if (this.role == 'Role') this.role = null;
    console.log(this.nome + "/" + this.cognome + "/" + this.role);
    this.listAccount();
  }

  onSelectedAccount(acc:any){
    console.log(acc);

    const enterAnimationDuration:string = '500ms';
    const exitAnimationDuration:string = '500ms';

    const dialogRef = this.dialog.open(Account , {
      width:'90%',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{
        account:acc
      }
    })



  }

 private listAccount() {
    this.accountServices.list(this.nome, this.cognome, this.role)
      .subscribe({
        next: ((r: any) => {
          this.accounts = r;
          console.log(this.accounts)
        }),
        error: ((r: any) => {
          console.log(r.error);
        })
      }
      )
  }
 


}
