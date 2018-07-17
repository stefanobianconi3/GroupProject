import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isLogged = false;
  constructor() { }

  isLoggedIn(){
    return this.isLogged;
  }

  signIn(email:String, password:String){

  }

  signUp(username:String, email:String, password:String){
    
  }

  logout(){
    this.isLogged=false;
  }

  login(){
    this.isLogged=true;
  }
}
