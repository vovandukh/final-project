import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubCategoryRequest, ISubCategoryResponce } from 'src/app/shared/interfaces/sub-category/sub-category.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category/sub-category.service';
import { Options } from "@angular-slider/ngx-slider";
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  public width: any = ['155', '165', '175', '185', '195', '205', '215', '225', '235', '245', '255', '265', '275', '285', '295', '315'];
  public height: any = ['40', '45', '50', '55', '60', '65', '70', '75', '80'];
  public Size: any = ['15', '16', '17', '18', '19', '20', '21', '22'];
  public size = false;
  public page: number = 1;
  public totalLength!: number;
  public minValue: number = 200;
  public maxValue: number = 800;
  public filterSizeForm!: FormGroup;
  public routerSubscription!: Subscription;
  public productSubscription!: Subscription;
  public options: Options = {
    floor: 0,
    ceil: 1000,
  };
  public buttonConfig = { type: 'button', text: 'read more', color: '#e43315' }
  public subCategory: ISubCategoryRequest[] = [];
  public product: IProductResponce[] = [];
  public subCategoryTitle = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initSizeForm();
    this.subscribeRouter();
    this.loadProducts();
  }

  loadProducts() {
    let name = this.activatedRoute.snapshot.paramMap.get('name');
    if (name == 'all') {
      this.productSubscription = this.productService.loadproductFB().subscribe(data => {
        this.product = [];
        this.product = data;
        this.categoryService.loadCategory().subscribe(data => {
          this.subCategory = [];
          this.subCategory = data;
        })
      })
    } else {
      this.productSubscription = this.productService.loadproductFB().subscribe(data => {
        this.product = [];
        let path;
        data.forEach((elem: any) => {
          if (elem.category.path == name || elem.subCategory.path == name || elem.brand == name) {
            this.product.push(elem)
            path = elem.category.path
          }
        });
        this.subCategoryService.loadSubCategoryNameFB(path).then(data => {
          this.subCategory = [];
          data.forEach(elem => {
            this.subCategory.push(elem.data() as ISubCategoryResponce)
          })

        })
      })
    }
  }

  subscribeRouter() {
    this.routerSubscription = this.activatedRoute.params.subscribe(() => {
      let name = this.activatedRoute.snapshot.paramMap.get('name');
      this.loadProducts()
      this.size = false;
      if (name == 'tire') {
        this.size = true;
      } else {
        this.size = false
      }
    })
  }

  initSizeForm() {
    this.filterSizeForm = this.fb.group({
      width: null,
      height: null,
      size: null
    })
  }

  filterBySize() {
    console.log(this.filterSizeForm.value);
    
    if (this.filterSizeForm.value.width && this.filterSizeForm.value.height || this.filterSizeForm.value.size) {
      this.productSubscription = this.productService.loadproductFB().subscribe(data => {
        this.product = [];
        data.forEach((elem: IProductResponce) => {
          if (elem.width == this.filterSizeForm.value.width &&
            elem.height == this.filterSizeForm.value.height ||
            elem.size == this.filterSizeForm.value.size) {
            this.product.push(elem)
          }
        });
      })
    }
  }
  filterProductByPrice() {
    let name = this.activatedRoute.snapshot.paramMap.get('name');
    this.productSubscription = this.productService.loadproductFB().subscribe(data => {
      if (name == 'all') {
        this.product = []
        data.forEach((elem: IProductResponce) => {
          if (elem.price > this.minValue && elem.price < this.maxValue) {
            this.product.push(elem)
          }
        })
      } else {
        this.product = [];
        data.forEach((elem: IProductResponce) => {
          if (elem.subCategory.path == name || elem.category.path == name || elem.brand == name) {
            if (elem.price > this.minValue && elem.price < this.maxValue) {
              this.product.push(elem)
            }
          }
        });
      }
    })
  }
  ngOnDestroy() {
    if (this.routerSubscription || this.productSubscription) {
      this.routerSubscription.unsubscribe()
      this.productSubscription.unsubscribe()
    }
  }
}
