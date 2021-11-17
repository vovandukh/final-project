import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-slider',
  templateUrl: './test-slider.component.html',
  styleUrls: ['./test-slider.component.scss']
})
export class TestSliderComponent implements OnInit {

  title = 'ngSlick';


  slides = [342, 453, 846, 855, 234, 564, 744, 243];

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "swipeToSlide": true,
    "dots": true,
    "arrows":false,
    "infinite": true,
    "autoplay":true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  addSlide() {
    this.slides.push(488)
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

  constructor() { }
 ngOnInit(){

 }
}
