import { Component, OnInit } from '@angular/core';
import { INewsResponce } from 'src/app/shared/interfaces/news/news.inteface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public page:number = 1;
  public totalLength!:number;
  public news:INewsResponce[] = [] 

  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.loadNews()
  }

  loadNews(){
    this.newsService.loadNews().subscribe(data =>{
     this.news = data as INewsResponce[];
     this.totalLength = data.length
    })
  }

}
