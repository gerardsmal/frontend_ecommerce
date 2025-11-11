import { Component } from '@angular/core';
import { FamigliaServices } from '../../services/famiglia-services';

@Component({
  selector: 'app-famiglia',
  standalone: false,
  templateUrl: './famiglia.html',
  styleUrl: './famiglia.css',
})
export class Famiglia {
  famiglia:any = null;

  constructor(private familySevices:FamigliaServices){}

  get families(){
    return this.familySevices.families();
  }

  
  search(){

  }

  create(){
  }
}
