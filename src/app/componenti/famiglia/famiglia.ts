import { Component, inject, OnInit } from '@angular/core';
import { FamigliaServices } from '../../services/famiglia-services';
import { MatDialog } from '@angular/material/dialog';
import { FamigliaUpdate } from '../../dialogs/famiglia-update/famiglia-update';

@Component({
  selector: 'app-famiglia',
  standalone: false,
  templateUrl: './famiglia.html',
  styleUrl: './famiglia.css',
})
export class Famiglia implements OnInit {
  famiglia: any = null;
  readonly dialog = inject(MatDialog);

  constructor(public familySevices: FamigliaServices) { }

  ngOnInit(): void {
    this.familySevices.list();
  }

  get families() {
    return this.familySevices.families();
  }

  onSelectedFamily(fam: any) {
    console.log(fam);
    this.callDialog(fam, 'U');
  }
  search() {
    console.log(this.famiglia);
    this.familySevices.list(this.famiglia);
  }

  create() {
    this.callDialog(null, 'C');
  }

  private callDialog(fam: any, modalita: any) {

    const enterAnimationDuration: string = '500ms';
    const exitAnimationDuration: string = '500ms';

    const dialogRef = this.dialog.open(FamigliaUpdate, {
      enterAnimationDuration,
      exitAnimationDuration,
      data: { famiglia: fam, mod: modalita }
    });
  }
}
