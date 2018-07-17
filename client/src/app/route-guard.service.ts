import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor( private router: Router, private auth: AuthService) { }
  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //this.router.navigate(['homepage']);
    if(this.auth.isLoggedIn){
      return true;
    }
    else{
    this.router.navigate(['homepage']);
    return false;
  }
}}
