import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/services/login/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private login:LoginService) { }

  ngOnInit(): void {
  }
   signOut(){
     this.login.signOut()
   }
}
