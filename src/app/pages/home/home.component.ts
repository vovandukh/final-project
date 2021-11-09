import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 public button3 = {type:'button',text:'order a callback',color:'#e43315'}
 public subscribeButton = {text:'subscribe', type: 'submit',color:'#e43315'}
  constructor() { }

  ngOnInit(): void {
  }

}
