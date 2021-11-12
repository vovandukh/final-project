import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService:LoginService,private auth:Auth,private router:Router) { }

  ngOnInit(): void {
  }

  signOut():void{
    signOut(this.auth).then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
      this.authService.$checkLogin.next(true)
    })
  }

}
