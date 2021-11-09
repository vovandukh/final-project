import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDoc, getDocs } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { ISubCategoryRequest, ISubCategoryResponce } from 'src/app/shared/interfaces/sub-category/sub-category.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category/sub-category.service';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public minValue: number = 100;
  public maxValue: number = 400;
  public options: Options = {
    floor: 0,
    ceil: 500,
  };
  public buttonConfig = { type: 'button', text: 'read more', color: '#e43315' }
  public subCategory: ISubCategoryRequest[] = [];
  public product: IProductResponce[] = [];
  public subCategoryTitle = false;

  constructor(private activatedRoute: ActivatedRoute, private subCategoryService: SubCategoryService, private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    if (name == 'all') {
      this.loadCategory();
      this.loadAllProducts();
    } else {
      this.loadSubCategory(name)
      this.loadProductsByCategory(name)
      this.subCategoryTitle = true;
    }
  }

  checkChange(path:string){
    this.loadSubCategory(path)
    this.loadProductsByCategory(path)
    this.subCategoryTitle = true;
  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(data => {
      this.subCategory = data;
    })
  }
  loadSubCategory(name: any) {
    this.subCategoryService.loadSubCategoryNameFB(name).then(data => {
      this.subCategory = [];
      data.forEach(doc => {
        let subCategory = { ...doc.data() as ISubCategoryResponce }
        this.subCategory.push(subCategory)
      })
    })
  }
  loadAllProducts(){
    this.productService.loadproductFB().subscribe(data =>{
      this.product = data;
    })
  }
  loadProductsByCategory(name: any) {
    this.productService.getProductCategory(name).then(data => {
      this.product = [];
      data.forEach(elem => {
        let product = {id:elem.id,...elem.data() }
        this.product.push(product as IProductResponce);
      });
    })
  }
  loadProductsBysubCategory(name: any) {
    this.productService.getProductSubCategory(name).then(data => {
      this.product = [];
      data.forEach(elem => {
        let product = {id:elem.id,...elem.data() }
        this.product.push(product as IProductResponce);
      })
    })
  }
  loadSubCategoryALL() {
    this.subCategoryService.loadSubCategoryFB().subscribe(data => {
      this.subCategory = [];
      this.subCategory = data;
    })
  }
}
