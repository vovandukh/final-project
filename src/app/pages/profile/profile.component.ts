import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public configMenu = {'display': 'none'}

  constructor(private authService:LoginService) { }

  ngOnInit(): void {
  }

  signOut():void{
    this.authService.logOut();
  }

  openMenu(status:boolean){
  if(status){
    this.configMenu = {'display': 'block'}
  } else{
    this.configMenu = {'display': 'none'}
  }
  }

}
