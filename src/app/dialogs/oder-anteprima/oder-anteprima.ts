import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-oder-anteprima',
  standalone: false,
  templateUrl: './oder-anteprima.html',
  styleUrl: './oder-anteprima.css',
})
export class OderAnteprima {
  indirizzoSpedizione:any;
  modalidaPagamento:any;
  carrello:any;

   constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<OderAnteprima>
  ) {
    if (data) {
      this.indirizzoSpedizione=data.indirizzoSpedizione;
      this.modalidaPagamento = data.modalidaPagamento;
      this.carrello = data.carrello;
      console.log(this.carrello)
    }

  }

  selectRC(opt:any){
    this.dialogRef.close(opt);
  }
}
