import { Component, OnInit } from '@angular/core';
import { INewsRequest, INewsResponce } from 'src/app/shared/interfaces/news/news.inteface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-video-slider',
  templateUrl: './video-slider.component.html',
  styleUrls: ['./video-slider.component.scss']
})
export class VideoSliderComponent implements OnInit {
  public news:INewsResponce[] = [];
  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(){
    let tag  ="perfomance";
    this.newsService.loadNewsByTag(tag).then(data =>{
      data.forEach(elem =>{
        let news = {id:elem.id,...elem.data() }
        this.news.push(news as INewsResponce);
      })
      console.log(this.news);
      
    })
  }

  playVideo(event:any) {
    console.log(event.target.parentNode.parentNode);
    
    // event.target.parentNode.parentNode.parentNode.removeChild(event);
    event.target.parentNode.parentNode.parentNode.children[1].style.display = 'block';
    event.target.parentNode.parentNode.parentNode.children[0].style.display = 'none';

  }

}
