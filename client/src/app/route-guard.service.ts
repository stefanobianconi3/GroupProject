import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor( private router: Router, private auth: AuthService) { }
  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
    switch(route.routeConfig.path){
      case "homepage": {
        if(!this.auth.isLoggedIn()){
          return true;
        } else {
            this.router.navigate(['dashboard']);
            return false;
        }
      };
      case "dashboard": {
        if(this.auth.isLoggedIn()){
          return true;
        }
        else{
          this.router.navigate(['homepage']);
          return false;
        }
      };
      case "modeler": {
        if(this.auth.isLoggedIn()){
          return true;
        } else {
            this.router.navigate(['homepage']);
            return false;
        }
      };
    }
  }
}
