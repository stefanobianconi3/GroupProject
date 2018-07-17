import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
private isLogged:boolean =false;
  constructor(private route: Router, private auth:AuthService) { }
login(){
  this.auth.login();
  this.isLogged = this.auth.isLoggedIn();
  this.route.navigate(['homepage','dashboard'])
}
signin(){
  this.route.navigate(['homepage','Signin'])
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
