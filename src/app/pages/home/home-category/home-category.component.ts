import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategoryRequest, ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.scss']
})
export class HomeCategoryComponent implements OnInit , OnDestroy {
  public category: ICategoryResponce[] = [];
  public categorySubscription!:Subscription;
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.loadCategory()
  }
 
  loadCategory(){
    this.categorySubscription = this.categoryService.loadCategory().subscribe(category =>{
      this.category = category;   
    })
  }

  ngOnDestroy(){
    this.categorySubscription.unsubscribe()
  }

}
