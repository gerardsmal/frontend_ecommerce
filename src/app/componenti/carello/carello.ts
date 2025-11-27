import { Component, OnInit, signal } from '@angular/core';
import { AccountServices } from '../../services/account-services';
import { AuthService } from '../../auth/auth-service';
import { CarrelloServices } from '../../services/carrello-services';

interface RigaCarello {
  id: number;
  image: string | null;
  productName: string;
  artist: string;
  genere: string;
  supporto: string;
  prezzo: number;
  quantita: number;
}

interface CarelloData {
  prezzoTotale: number;
  riga: RigaCarello[];
}

interface Account {
  carello: CarelloData;
}

@Component({
  selector: 'app-carello',
  standalone: false,
  templateUrl: './carello.html',
  styleUrl: './carello.css',
})
export class Carello implements OnInit {

  account = signal<Account | null>(null);

  constructor(
    private accountServices: AccountServices,
    private auth: AuthService,
    private carelloServices: CarrelloServices
  ) { }

  ngOnInit(): void {
    this.loadAccount();
  }

  private loadAccount() {
    this.accountServices.getAccount(this.auth.grant().userId)
      .subscribe({

        next: (response: any) => {
          console.log("Account ricevuto:", response);
          this.account.set(response);
        },
        error: (err) => {
          console.log("Errore caricamento account:", err.error?.msg);
        }
      });
  }

  onSelectedProduct(riga: RigaCarello) {
    console.log("onSelectedProduct")
  }
  onDelete(id: number) {
    console.log("delete:", id);
    this.carelloServices.deleteRiga(id)
      .subscribe({
        next: ((r: any) => {
          this.loadAccount();
          let numStr = this.auth.grant().carelloSize ?? 0;
          let num = parseInt(numStr.toString(), 10);
          this.auth.setCarelloSize(num - 1);
        }),
        error: ((r: any) => {
          console.log(r.error.msg)
        })
      })

  }

  onChangeQuantita(riga:any, value:any){
    console.log("value:" + value);
  }
}
