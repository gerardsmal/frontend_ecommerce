import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderServices } from '../../services/order-services';
import { AuthService } from '../../auth/auth-service';
import { PagamentoServices } from '../../services/pagamento-services';
import { MatDialog } from '@angular/material/dialog';
import { OderAnteprima } from '../../dialogs/oder-anteprima/oder-anteprima';
import { AccountServices } from '../../services/account-services';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { OrderDetails } from '../../dialogs/order-details/order-details';

@Component({
  selector: 'app-ordine',
  standalone: false,
  templateUrl: './ordine.html',
  styleUrl: './ordine.css',
})
export class Ordine implements OnInit {

  @ViewChild('stepper') stepper!: MatStepper;

  duration = '1000'

  listaSpedizione = signal<any[]>([]);
  msg = signal("");

  msgOrdine = signal({
    isOK: true,
    msg: ""
  })

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
    private accountService: AccountServices,
    private rounting: Router
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

  controlStatus() {
    this.orderServices.orderStatus(this.accountId)
      .subscribe({
        next: ((r: any) => {
          if (r.msg) {
            this.stepper.next();
          } else {
            this.msgOrdine.set({
              isOK: false,
              msg: 'Ultimo ordine non concluso.'
            })
          }
        }),
        error: ((r: any) => {
          console.log("errore in orderStatus:" + r.error.msg);
        })
      })
  }

  removeOrdine() {
    this.orderServices.delete(this.accountId)
      .subscribe({
        next: ((r: any) => {
          this.rounting.navigate(['dash/carello'])
        }),
        error: ((r: any) => {
          console.log("errore nella cancelazione:" + r.error.msg);
        })
      })



  }

  conclude() {
    this.msgOrdine.set({
      isOK: true,
      msg: ''
    })

    this.stepper.linear = false;
    this.stepper.selectedIndex = this.stepper.steps.length - 1;
    this.stepper.linear = true;
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
    dialogRef.afterClosed()
      .subscribe(r => {
        if (r == 'ordine') {
          console.log("esegue l'ordine");
          this.stepper.next();
        }
        if (r == 'carrello') {
          console.log("carrello");
          this.rounting.navigate(['dash/carello'])
        }

      })
  }

  createOrdine() {
    this.orderServices.create({
      accountID: this.accountId,
      spedizioneID: this.indirizzoSelected().id,
      modalitaID: this.pagamentoSelected().id
    }).subscribe({
      next: ((r: any) => {
        this.msgOrdine.set({
          isOK: true,
          msg: r.msg
        })
      }),
      error: ((r: any) => {
        this.msgOrdine.set(r.error.msg);
        this.msgOrdine.set({
          isOK: false,
          msg: r.error.msg
        })
      })
    })
  }
  nextStep() {
    console.log('next step...');
    this.msgOrdine.set({
      isOK: true,
      msg: ""
    })
    this.stepper.next();
  }
  confermaOrdine() {
    console.log("eseguo conferma ordine..")
    this.orderServices.confirm({
      accountID: this.accountId
    }).subscribe({
      next: ((r: any) => {
        this.auth.setCarelloSize(0);
        this.callDetails(r);
      }),
      error: ((r: any) => {
        this.msgOrdine.set({
          isOK: false,
          msg: r.error.msg
        })

      })
    })

  }

  private callDetails(order: any) {
    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';
    const dialogRef = this.dialog.open(OrderDetails, {
      width: '1100px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '200v',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        order: order
      },
      panelClass: 'wide-dialog'
    });
  }



 
}
