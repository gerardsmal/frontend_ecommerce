import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountServices } from '../../services/account-services';

@Component({
  selector: 'app-email-validation',
  standalone: false,
  templateUrl: './email-validation.html',
  styleUrl: './email-validation.css',
})
export class EmailValidation implements OnInit {
  id: any;
  msg = signal("");

  constructor(
    private route: ActivatedRoute,
    private routing: Router,
    private accountServices: AccountServices) {

  }


  ngOnInit(): void {
    this.msg.set("");
    this.id = this.route.snapshot.paramMap.get("id");
    console.log("id:" + this.id);

  }
  validate() {
    console.log("validate..." + this.id);
    this.accountServices.validateEmail(this.id)
      .subscribe({
        next: ((r: any) => {
          console.log(r);
          this.routing.navigate(['/dash']);
        }),
        error: ((r: any) => {
          this.msg.set(r.error.msg);
        })
      })

  }
}
