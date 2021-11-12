import { Component, OnInit } from '@angular/core';
import { INewsResponce } from 'src/app/shared/interfaces/news/news.inteface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-right-menu-news',
  templateUrl: './right-menu-news.component.html',
  styleUrls: ['./right-menu-news.component.scss']
})
export class RightMenuNewsComponent implements OnInit {
  public news:INewsResponce[] = [] 
  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.loadNews()
  }
  loadNews(){
    this.newsService.loadNews().subscribe(data =>{
     this.news = data as INewsResponce[];
     console.log(this.news);
    })
  }
}
