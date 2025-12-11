import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderServices } from '../../services/order-services';
import { AuthService } from '../../auth/auth-service';
import { PagamentoServices } from '../../services/pagamento-services';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { OderAnteprima } from '../../dialogs/oder-anteprima/oder-anteprima';
import { AccountServices } from '../../services/account-services';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { OrderDetails } from '../../dialogs/order-details/order-details';
import { ComponentType } from '@angular/cdk/portal';

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
          console.log(r)
          // passagggio del parametri per la funziona generalizzata
          const dialogRef = this.openDialog(OderAnteprima, {
            indirizzoSpedizione: this.indirizzoSelected(),
            modalidaPagamento: this.pagamentoSelected(),
            carrello: r.carello
          });
          dialogRef.afterClosed().subscribe(r => {
            if (r === 'ordine') {
              console.log("esegue l'ordine");
              this.stepper.next();
            }
            if (r === 'carrello') {
              console.log("carrello");
              this.rounting.navigate(['dash/carello']);
            }
          });
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
        let orderSize = this.auth.grant().orderSize ?? 0;
        this.auth.setOrderSize(orderSize + 1);
        this.stepper.next();
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
        const dialogRef = this.openDialog(OrderDetails, {
          order: r
        });
        dialogRef.afterClosed()
          .subscribe(() => {
            this.rounting.navigate(['dash/home']);
          })
      }),
      error: ((r: any) => {
        this.msgOrdine.set({
          isOK: false,
          msg: r.error.msg
        })

      })
    })

  }

  /**
   * chiamate generalizzato d'un dialog usando generics di Typescript
   * T = tipo del componente del dialog
   * D = tipo dei dati passati (data)
   * R = tipo del valore ritornato da afterClosed()
   */
  private openDialog<T, D = any, R = any>(
    component: ComponentType<T>,
    data?: D,
    config?: MatDialogConfig<D>
  ): MatDialogRef<T, R> {

    const baseConfig: MatDialogConfig<D> = {
      width: '1100px',
      maxWidth: '90vw',
      height: 'auto',
      maxHeight: '200vh',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      panelClass: 'wide-dialog',
      data
    };

    return this.dialog.open<T, D, R>(component, {
      ...baseConfig,
      ...config   // se vuoi sovrascrivere qualcosa di specifico
    });
  }
  //////



}
