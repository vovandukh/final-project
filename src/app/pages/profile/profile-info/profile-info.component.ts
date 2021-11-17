import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  public user:any;

  constructor() { }

  ngOnInit(): void {
    this.loadUser()
    
  }

  loadUser(){
    if(localStorage.length > 0 && localStorage.getItem('users')){
      let user = JSON.parse(localStorage.getItem('users') as string);
      if(user.role == 'USER'){
        this.user = user;
      }
    }
  }

}
