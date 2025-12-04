import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderServices } from '../../services/order-services';
import { AuthService } from '../../auth/auth-service';
import { PagamentoServices } from '../../services/pagamento-services';
import { MatDialog } from '@angular/material/dialog';
import { OderAnteprima } from '../../dialogs/oder-anteprima/oder-anteprima';
import { AccountServices } from '../../services/account-services';

@Component({
  selector: 'app-ordine',
  standalone: false,
  templateUrl: './ordine.html',
  styleUrl: './ordine.css',
})
export class Ordine implements OnInit {
  duration = '1000'

  listaSpedizione = signal<any[]>([]);
  msg = signal("");
  indirizzo: any = null;
  indirizzoSelected = signal<any>(null);
  creaNuovoIndirizzo: boolean = false;
  accountId: any = null;
  metodiPagamento: any = [];
  pagamentoSelected = signal<any>(null);

  readonly dialog = inject(MatDialog);

  createForm: FormGroup = new FormGroup({
    nome: new FormControl(null, Validators.required),
    cognome: new FormControl(null, Validators.required),
    via: new FormControl(null, Validators.required),
    comune: new FormControl(null, Validators.required),
    cap: new FormControl(null, Validators.required),
  })

  pagamentoForm = new FormGroup({
    metodo: new FormControl(null, Validators.required),
  });




  constructor(private orderServices: OrderServices,
    private pagamentoServices: PagamentoServices,
    private auth: AuthService,
    private accountService: AccountServices
  ) { }

  ngOnInit(): void {
    this.accountId = this.auth.grant().userId;
    this.getListSpedizione();
    this.pagamentoServices.list()
      .subscribe({
        next: ((r: any) => {
          this.metodiPagamento = r;
        }),
        error: ((r: any) => {
          console.log(r.error.msg)
        })
      })
  }




  selectIdirizzo() {
    this.orderServices.getSpedizione(this.indirizzo)
      .subscribe({
        next: ((r: any) => {
          this.indirizzoSelected.set(r);
          console.log(r)
        }),
        error: ((r: any) => {
          console.log(r.error.msg);
        })
      })

  }


  registrazione(panel: any) {
    this.orderServices.createSpedizione({
      nome: this.createForm.value.nome,
      cognome: this.createForm.value.cognome,
      via: this.createForm.value.via,
      commune: this.createForm.value.comune,
      cap: this.createForm.value.cap,
      accountId: this.accountId
    }).subscribe({
      next: ((r: any) => {
        console.log(r);
        this.getListSpedizione();
        panel.close();
        this.creaNuovoIndirizzo = false;

      }),
      error: ((r: any) => {
        this.msg.set(r.error.msg);
      })
    })
  }

  confermaPagamento() {
    this.pagamentoServices.getPagamento(this.pagamentoForm.value.metodo)
      .subscribe({
        next: ((r: any) => {
          this.pagamentoSelected.set(r);
          console.log(this.pagamentoSelected());
        }),
        error: ((r: any) => {
          console.log(r.error.msg)
        })


      })

  }
  anteprima() {

    this.accountService.getAccount(this.accountId)
      .subscribe({
        next: ((r: any) => {
          this.callDialog(r.carello)
        }),
        error: ((r: any) => console.log('error account:' + r.err.msg))
      })

  }
  private getListSpedizione() {
    this.orderServices.listSpedizione(this.accountId)
      .subscribe({
        next: ((r: any) => {
          this.listaSpedizione.set(r);
          console.log(r);
        }),
        error: ((r: any) => {
          console.log(r.error.msg);
        })
      })

  }
  private callDialog(carrelo: any) {
    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';
    const dialogRef = this.dialog.open(OderAnteprima, {
      width: '1100px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '200v',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        indirizzoSpedizione: this.indirizzoSelected(),
        modalidaPagamento: this.pagamentoSelected(),
        carrello: carrelo
      },
      panelClass: 'wide-dialog'
    });

  }
}
