import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
   public subscribeButton = {text:'subscribe',type:'submit' , color:'#e43315'}
  constructor() { }

  ngOnInit(): void {
    
  }

}
