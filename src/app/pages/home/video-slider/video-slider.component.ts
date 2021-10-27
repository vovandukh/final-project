import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: ['./video-slider.component.scss']
})
export class VideoSliderComponent implements OnInit {
  public button = {type:'button',text:'read more',color:'#e43315'}
  constructor() { }

  ngOnInit(): void {
  }

}
