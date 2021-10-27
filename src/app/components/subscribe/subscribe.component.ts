import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  public subscribeButton = {text:'subscribe', type: 'submit',color:'#e43315'}
  constructor() { }

  ngOnInit(): void {
  }

}
