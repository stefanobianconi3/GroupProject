import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: Router) { }
login(){
  this.route.navigate(['homepage','dashboard'])
}
signin(){
  this.route.navigate(['homepage','Signin'])
}
  ngOnInit() {
  }

}
