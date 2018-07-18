import { Injectable, Output, EventEmitter } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
@Output() outLogin = new EventEmitter()
@Output() outSignin = new EventEmitter()
@Output() outLogout = new EventEmitter()


constructor() { }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  signIn(nome:string, cognome:string, email:string, password:string){
    localStorage.setItem('token', email);
    this.outSignin.emit();
  }

   logout(){
    localStorage.removeItem('token');
    this.outLogout.emit();
  }

  login(email:string, password:String){
    localStorage.setItem('token', email);
    this.outLogin.emit();
  }
}
