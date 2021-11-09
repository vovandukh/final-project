import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private route:Router) { }

  signOut(){
    localStorage.removeItem('users');
   this.route.navigate([''])
  }
}
