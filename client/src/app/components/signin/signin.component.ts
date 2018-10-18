import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {
  private fail:boolean = false;
  private errore:String;
  
  constructor(private auth:AuthService, private route: Router) {
    auth.errorSignin.subscribe(
      (errore) => {
        this.fail=true;
        this.errore= errore;
      }
    )
  }

  ngOnInit() {
  }

  signIn(form: NgForm){
    if(!form.valid){
      return false;
    }
    this.route.navigate(['homepage']);
    this.auth.signIn(form.value.firstname, form.value.lastname, form.value.date, form.value.email, form.value.password, form.value.affiliation);
  }

}
