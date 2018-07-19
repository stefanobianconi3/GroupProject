import { Component, OnInit } from '@angular/core';
import { NgForm, Form } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private auth:AuthService, private route: Router) { }

  signIn(form: NgForm){
    if(!form.valid){
      return false;
    }
    this.auth.signIn(form.value.firstname, form.value.lastname, form.value.date, form.value.email, form.value.password);
}
  
  ngOnInit() {
  }

}
