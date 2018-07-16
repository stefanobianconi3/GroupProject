import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor( private router: Router) { }
  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //this.router.navigate(['homepage']);
    return true;
  }
}
