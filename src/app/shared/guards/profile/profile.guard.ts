import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  constructor( public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isUserLogin();
  }

  isUserLogin(): boolean {
    if(localStorage.length > 0 && localStorage.getItem('users')){
      const user = JSON.parse(localStorage.getItem('users') as string);
      if(user && user.role === 'USER'){
        return true;
      }
      else {
        return false;
      }
    }
    else {
      this.router.navigate(['/login-user'])
      return false;
    }
  }
  
}
