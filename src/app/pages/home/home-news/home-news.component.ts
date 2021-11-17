import { Component, OnInit } from '@angular/core';
import { INewsResponce } from 'src/app/shared/interfaces/news/news.inteface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit {
  public news:INewsResponce[] = []
  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.loadNews()
  }
  loadNews(){
    let tag  ="other";
    this.newsService.loadNewsByTag(tag).then(data =>{
      data.forEach(elem =>{
        let news = {id:elem.id,...elem.data() }
        this.news.push(news as INewsResponce);
      })      
    })
  }
}
