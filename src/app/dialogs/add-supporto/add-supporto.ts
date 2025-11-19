import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProdottiServices } from '../../services/prodotti-services';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-add-supporto',
  standalone: false,
  templateUrl: './add-supporto.html',
  styleUrl: './add-supporto.css',
})
export class AddSupporto implements OnInit {
  mod: any;
  product: any;
  prezzo: any = signal<any>(null);

  supporto: any;
  readonly dialog = inject(MatDialog);

  msg = signal('');

  updateForm: FormGroup = new FormGroup({
    supporto: new FormControl(null, Validators.required),
    prezzo: new FormControl(null, Validators.required),
    stock: new FormControl(),
    alert: new FormControl()
  })


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private productServices: ProdottiServices,
    private dialogRef: MatDialogRef<AddSupporto>
  ) {
    if (data) {
      this.product = data.product;
      this.prezzo.set(data.prezzo);
      this.mod = data.mod
    }

  }
  ngOnInit(): void {
    if (this.mod == 'U') {

      console.log("Init:" + this.product.id)
      this.updateForm.patchValue({
        supporto: this.prezzo().supporto,
        prezzo: this.prezzo().prezzo,
        stock: this.prezzo().stock?.currentStock,
        alert: this.prezzo().stock?.stockAlert
      })
    }
  }

  onSubmit() {
    if (this.mod == 'U') this.onUpdate();
    if (this.mod == 'C') this.onCreate();
  }

  onUpdate() {
    this.msg.set('');
    console.log("update:" + this.product.id);

    const updateBody: any = {
      id: this.prezzo().id,
      idProdotto: this.product.id
    };
    console.log(updateBody);

    if (this.updateForm.controls['supporto'].dirty)
      updateBody.supporto = this.updateForm.value.supporto;

    if (this.updateForm.controls['prezzo'].dirty)
      updateBody.prezzo = this.updateForm.value.prezzo;

    updateBody.currentStock = this.updateForm.value.stock;
    updateBody.stockAlert = this.updateForm.value.alert;

    console.log(updateBody);

    this.callAddPrezzo(updateBody);



  }
  onCreate() {
    this.msg.set('');
    console.log("create:" + this.product.id);

    const createBody: any = {
      idProdotto: this.product.id
    };

    createBody.supporto = this.updateForm.value.supporto;
    createBody.prezzo = this.updateForm.value.prezzo;
    createBody.currentStock = this.updateForm.value.stock;
    createBody.stockAlert = this.updateForm.value.alert;

    console.log(createBody);

    this.callAddPrezzo(createBody);


  }
  private callAddPrezzo(body: {}) {
    this.productServices.addPrezzoStock(body)
      .subscribe({
        next: ((r: any) => {
          this.productServices.getProduct(this.product.id)
            .subscribe({
              next: ((r: any) => {
                this.dialogRef.close("ok");
              }),
              error: ((r: any) => {
                console.log(r.error.msg);
              })
            })
        }),
        error: ((r: any) => {
          this.msg.set(r.error.msg);
        })
      })

  }

  remove() {
    console.log("id prezzo: " + this.prezzo().id)

    const dialogConfirm = this.dialog.open(ConfirmDialog);
    dialogConfirm.afterClosed()
      .subscribe(r => {
        if (r == 'si') this.removeAction(this.prezzo().id);
      })
  }

  removeAction(id:any){
    this.productServices.deletePrezzo(id)
      .subscribe({
        next:((r:any) => {
          console.log(r)
          this.dialogRef.close('ok');
        }),
        error:((r:any) => {
          console.log(r.error.msg)
        })
      })      

  }

}
