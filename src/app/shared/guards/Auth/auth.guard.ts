import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdminLogin();
  }
  isAdminLogin():boolean {
    if (localStorage.length > 0 && localStorage.getItem('users')){
      const user = JSON.parse(localStorage.getItem('users') as string);
      if( user && user.role === "ADMIN"){
        return true
      } else{
        this.router.navigate(['login']);
        return false;
      }
    }
    this.router.navigate(['login']);
    return false;
  }
}
