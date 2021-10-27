import { Component, OnInit } from '@angular/core';
import { ICategoryRequest } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-home-category',
  templateUrl: './home-category.component.html',
  styleUrls: ['./home-category.component.scss']
})
export class HomeCategoryComponent implements OnInit {
  public category: ICategoryRequest[] = []
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.loadCategory()
  }
 
  loadCategory(){
    this.category = this.categoryService.loadCategory()
  }

}
