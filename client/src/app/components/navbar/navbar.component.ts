import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
private isLogged:boolean =false;
private fail : boolean = false;
  private errore: String;
  constructor(private route: Router, private auth: AuthService, private data: DataService) { 
    auth.outLogin.subscribe(
      () => {
        this.isLogged=true;
    });
    auth.outSignin.subscribe(
      () => {
        this.isLogged=true;
    });
    auth.outLogout.subscribe(
      () => {
        this.isLogged=false;
    });
    auth.errorLogin.subscribe(
      (errore) => {
        this.fail=true;
        this.errore=errore;

      });
    data.outLogout.subscribe(
      () => {
        this.isLogged = false;
      }
    )
  }

logIn(form: NgForm){
  this.auth.login(form.value.email, form.value.password);
}

signin(form){
  form.reset();
  this.route.navigate(['signin']);
}

logout(e, form){
  this.auth.logout();
  this.route.navigate(['homepage']);
  
  e.preventDefault();
}

ngOnInit() {
  this.isLogged=this.auth.isLoggedIn();
}

}
