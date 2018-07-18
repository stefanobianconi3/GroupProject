import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  signIn(nome:string, cognome:string, email:string, password:string){
    localStorage.setItem('token', email);
  }

   logout(){
    localStorage.removeItem('token');
  }

  login(email:string, password:String){
    localStorage.setItem('token', email);
  }
}
