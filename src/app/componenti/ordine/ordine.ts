import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderServices } from '../../services/order-services';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-ordine',
  standalone: false,
  templateUrl: './ordine.html',
  styleUrl: './ordine.css',
})
export class Ordine implements OnInit {
  listaSpedizione: any[] = [];
  indirizzo: any;
  creaNuovoIndirizzo: boolean = false;
  createForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    via: new FormControl(null, Validators.required),
    comune: new FormControl(null, Validators.required),
    cap: new FormControl(null, Validators.required),
  })



  constructor(private orderServices: OrderServices,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.orderServices.init({
      accountId: this.auth.grant().userId
    }).subscribe({
      next: ((r: any) => {
        this.orderServices.listSpedizione(this.auth.grant().userId)
          .subscribe({
            next: ((r: any) => {
              console.log(r);
              this.listaSpedizione = r;
            }),
            error: ((r: any) => {
              console.log("errore:" + r.error.msg)
            })
          })
      }),
      error: ((r: any) => {
        console.log("errore:" + r.error.msg)
      })
    })

  }

  duration = '1000'



  selectIdirizzo() {
    console.log(this.indirizzo);
    this.createForm.reset();
  }


  registrazione(panel: any) {
    panel.close();
    this.creaNuovoIndirizzo=false;
  }

}
