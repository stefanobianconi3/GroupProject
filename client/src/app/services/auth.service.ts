import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerLocation } from '../classes/ServerLocation';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
@Output() outLogin = new EventEmitter()
@Output() outSignin = new EventEmitter()
@Output() outLogout = new EventEmitter()

private APIAUTHURL = ServerLocation.URL+'api/auth';
constructor(private http: HttpClient) { }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  signIn(firstname:string, lastname:string,date:string, email:string, password:string){
    this.http.post(this.APIAUTHURL+'/register', {firstname, lastname, date, email, password,}).subscribe(
      (payload:any) => {
        if(payload.success){
        localStorage.setItem('token', payload.token);
        this.outSignin.emit();
      }
        else{
          alert(payload.error);
        }
      },
      (error:any) => {
        alert(error)
      }
    )
  }

   logout(){
    localStorage.removeItem('token');
    this.outLogout.emit();
  }

  login(email:string, password:String){
    this.http.post(this.APIAUTHURL+'/login', {email: email, password: password}).subscribe(
      (payload: any) => {
        if(payload.success){
          localStorage.setItem('token', payload.token);
          this.outLogin.emit();
        } else {
          alert(payload.error)
        }
      },
      (error) => {
        alert(error.statusText)
      }
    )
    
    
  }
}
