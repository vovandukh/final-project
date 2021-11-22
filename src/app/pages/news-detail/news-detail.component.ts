import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class NewsDetailComponent implements OnInit {
  public news:any = {};
  public newsID = this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private newsService:NewsService, private activatedRoute:ActivatedRoute, ) { }
    

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(){
    this.newsService.getNewsById(this.newsID as string).then(data =>{
      this.news = data.data();
    })
  }
}
