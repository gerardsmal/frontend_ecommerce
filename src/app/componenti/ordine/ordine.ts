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
  indirizzo: any = null;
  creaNuovoIndirizzo: boolean = false;
  createForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    via: new FormControl(null, Validators.required),
    comune: new FormControl(null, Validators.required),
    cap: new FormControl(null, Validators.required),
  })

  pagamentoForm = new FormGroup({
    metodo: new FormControl(null, Validators.required),
    numeroCarta: new FormControl(null),
    scadenza: new FormControl(null),
    cvv: new FormControl(null),
  });


  metodiPagamento = [
    { value: 'paypal', label: 'PayPal' },
    { value: 'carta', label: 'Carta di Credito' },
    { value: 'contrassegno', label: 'Pagamento alla consegna' },
  ];

  constructor(private orderServices: OrderServices,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const accountId = this.auth.grant().userId;
    this.orderServices.init({
      accountId: accountId
    }).subscribe({
      next: ((r: any) => {
        this.orderServices.listSpedizione(accountId)
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
    this.creaNuovoIndirizzo = false;
  }

  confermaPagamento() {
    console.log("Metodo scelto:", this.pagamentoForm.value.metodo);
  }
}
