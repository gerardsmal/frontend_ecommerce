import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProdottiServices } from '../../services/prodotti-services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      console.log(this.product)
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
    const updateBody: any = { id: this.prezzo().id , idProdotto: this.product.id};

    if (this.updateForm.controls['supporto'].dirty)
      updateBody.supporto = this.updateForm.value.supporto;

    if (this.updateForm.controls['prezzo'].dirty)
      updateBody.prezzo = this.updateForm.value.prezzo;

      updateBody.currentStock = this.updateForm.value.stock;
      updateBody.stockAlert = this.updateForm.value.alert;

    console.log(updateBody);

    this.productServices.addPrezzoStock(updateBody)
      .subscribe({
        next:((r:any) => {
          this.productServices.getProduct(this.product.id)
            .subscribe({
              next:((r:any) => {
                this.dialogRef.close("ok");
              }),
              error:((r:any) => {
                console.log(r.error.msg);
              })
            })
        }),
        error:((r:any) => {
          this.msg.set(r.error.msg);
        })
      })


  }
  onCreate() {

  }

  remove() {

  }
}
