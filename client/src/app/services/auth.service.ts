import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerLocation } from '../classes/ServerLocation';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
@Output() outLogin = new EventEmitter()
@Output() outSignin = new EventEmitter()
@Output() outLogout = new EventEmitter()
@Output() errorLogin = new EventEmitter()
@Output() errorSignin = new EventEmitter()

private APIAUTHURL = ServerLocation.URL+'api/auth';
constructor(private http: HttpClient, private route: Router) { }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  signIn(firstname:string, lastname:string,userDate:string, email:string, password:string){
    let date=userDate["day"]+'/'+userDate["month"]+'/'+userDate["year"];
    this.http.post(this.APIAUTHURL+'/signin', {firstname, lastname, date, email, password,}).subscribe(
      (payload:any) => {
        if(payload.success){
        localStorage.setItem('token', payload.token);
        localStorage.setItem('nome', firstname);
        this.outSignin.emit();
      }
        else{
          this.errorSignin.emit(payload.error);

        }
      },
      (error:any) => {
        this.errorSignin.emit(error)
      }
    )
  }

   logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    this.outLogout.emit();
  }

  login(email:string, password:String){
    this.http.post(this.APIAUTHURL+'/login', {email: email, password: password}).subscribe(
      (payload: any) => {
        if(payload.success){
          let userData = payload.data[0]
          localStorage.setItem('token', payload.token);
          localStorage.setItem('id',userData.id);
          localStorage.setItem('nome',userData.firstname);
          this.outLogin.emit();
          this.route.navigate(['dashboard']);
        } else {
          this.errorLogin.emit(payload.error);
          
        }
      },
      (error) => {
        this.errorLogin.emit(error);
      }
    )
    
    
  }
}
