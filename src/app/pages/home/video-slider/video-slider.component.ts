import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from 'rxjs';
import { INewsResponce } from 'src/app/shared/interfaces/news/news.inteface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: ['./video-slider.component.scss']
})
export class VideoSliderComponent implements OnInit, OnDestroy {
  public news: INewsResponce[] = [];
  public newsSubscription!: Subscription;
  constructor(private newsService: NewsService) { }

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews() {
    let tag = "perfomance";
    this.newsSubscription = this.newsService.loadNews().subscribe(data => {
      data.forEach((elem) => {
        if (elem.tags == tag) {
          this.news.push(elem as INewsResponce)
        }
      })
    })
  }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "swipeToSlide": false,
    "dots": true,
    "speed": 500,
    "arrows": false,
    "infinite": true,
    "autoplay": true,
    "responsive": [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };


  slickInit(e: any) {

  }
  breakpoint(e: any) {

  }
  afterChange(e: any) {

  }
  beforeChange(e: any) {

  }

  ngOnDestroy() {
   this.newsSubscription.unsubscribe()
  }

  playVideo(event: any) {
    event.target.parentNode.parentNode.parentNode.children[1].style.display = 'block';
    event.target.parentNode.parentNode.parentNode.children[0].style.display = 'none';
  }

}
