import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
private isLogged:boolean =false;
  constructor(private route: Router, private auth:AuthService) { }
logIn(form: NgForm){
  alert(form.value.email)
  this.auth.login();
  this.isLogged = this.auth.isLoggedIn();
  this.route.navigate(['homepage','dashboard'])
}
signin(){
  this.route.navigate(['homepage','Signin'])
}
toHome(){
  this.route.navigate(['homepage'])
}
logout(e){
  this.auth.logout();
  this.isLogged= this.auth.isLoggedIn();
  this.route.navigate(['homepage']);
  e.preventDefault();
}
  ngOnInit() {
    this.isLogged=this.auth.isLoggedIn();
  }

}
