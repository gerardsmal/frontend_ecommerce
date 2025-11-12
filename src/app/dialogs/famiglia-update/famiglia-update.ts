import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FamigliaServices } from '../../services/famiglia-services';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-famiglia-update',
  standalone: false,
  templateUrl: './famiglia-update.html',
  styleUrl: './famiglia-update.css',
})
export class FamigliaUpdate implements OnInit {
  famiglia: any;
  mod: any;
  readonly dialog = inject(MatDialog);

  updateForm: FormGroup = new FormGroup({
    descrizione: new FormControl(null, Validators.required),
  })

  msg = signal('');
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private familyService: FamigliaServices,
    private dialogRef: MatDialogRef<FamigliaUpdate>
  ) {
    if (data) {
      this.famiglia = data.famiglia
      this.mod = data.mod
    }

  }
  ngOnInit(): void {
    console.log("modalità:" + this.mod);
    if (this.mod == 'U') {
      this.updateForm.patchValue({
        descrizione: this.famiglia.descrizione
      })
    }


  }
  onSubmit(){
    if (this.mod == 'U') this.onUpdate();
    if (this.mod == 'C') this.onCreate();
  }

  onCreate(){
    this.msg.set('');
    this.familyService.create({
      descrizione: this.updateForm.value.descrizione
    }).subscribe({
      next:((r:any) => {
        console.log(r);
        this.dialogRef.close();
      }),
      error:((r:any) => {
        this.msg.set(r.error.msg)
      })
    })   
  }

  onUpdate() {
    this.msg.set('');
    this.familyService.update({
      id: this.famiglia.id,
      descrizione: this.updateForm.value.descrizione
    }).subscribe({
      next: ((r: any) => {
        console.log(r);
        this.dialogRef.close();
      }),
      error: ((r: any) => {
        this.msg.set(r.error.msg);
      })
    })

  }

  remove() {
    const dialogConfirm = this.dialog.open(ConfirmDialog);
    dialogConfirm.afterClosed()
      .subscribe(r => {
        if (r == 'si') this.removeAction();
      })
  }

  removeAction() {
    this.msg.set('');
    this.familyService.delete(this.famiglia.id)
      .subscribe({
        next: ((r: any) => {
          this.dialogRef.close();
        }),
        error: ((r: any) => {
          this.msg.set(r.error.msg);
        })
      })

  }

}
