import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ordine',
  standalone: false,
  templateUrl: './ordine.html',
  styleUrl: './ordine.css',
})
export class Ordine {
 private _formBuilder = inject(FormBuilder);
  duration = '1000'

  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
}
