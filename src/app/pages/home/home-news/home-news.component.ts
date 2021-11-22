import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { INewsResponce } from 'src/app/shared/interfaces/news/news.inteface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-home-news',
  templateUrl: './home-news.component.html',
  styleUrls: ['./home-news.component.scss']
})
export class HomeNewsComponent implements OnInit, OnDestroy {
  public news:INewsResponce[] = []
  public newsSubscription!:Subscription;
  constructor(private newsService:NewsService) { }

  ngOnInit(): void {
    this.loadNews()
  }
  loadNews(){
    let tag  ="other";
    this.newsSubscription = this.newsService.loadNews().subscribe(data =>{
      data.forEach(elem =>{
        if(elem.tags == tag){
          this.news.push(elem as INewsResponce)
        }
      })
    })
  }
  ngOnDestroy(){
    this.newsSubscription.unsubscribe()
  }
}
