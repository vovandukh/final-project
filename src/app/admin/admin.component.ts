import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private login:LoginService, private router:Router,private Auth:Auth) { }

  ngOnInit(): void {
  }
   signOut(){
    this.login.logOut()
   }
}
