import { Injectable } from '@angular/core';
import { ICategoryRequest } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category:ICategoryRequest[] = [
    {imagePath: 'assets/images/category-image/cat-1.webp',title: 'wheels', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-2.webp',title: 'lighting', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-3.jpg',title: 'perfomance', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-4.jpg',title: 'electronics', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-5.webp',title: 'exterior', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-6.webp',title: 'body parts', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-7.webp',title: 'interior', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-8.webp',title: 'vertical doors', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-9.webp',title: 'repair parts', description: '', path: ''},
    {imagePath: 'assets/images/category-image/cat-10.webp',title: 'other', description: '', path: ''},
  
  ]
  constructor() { }
  loadCategory():ICategoryRequest[]{
    return this.category;
  }
}
