import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 public button1 = {type:'button',text:'shop vossen',color:'#e43315'}
 public button2 = {type:'button',text:'more brands',color:'rgb(30,30,30)'}
 public button3 = {type:'button',text:'order a callback',color:'#e43315'}
  constructor() { }

  ngOnInit(): void {
  }

}
