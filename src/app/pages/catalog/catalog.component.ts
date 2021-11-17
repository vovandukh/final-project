import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubCategoryRequest, ISubCategoryResponce } from 'src/app/shared/interfaces/sub-category/sub-category.interface';
import { SubCategoryService } from 'src/app/shared/services/sub-category/sub-category.service';
import { Options } from "@angular-slider/ngx-slider";
import { ProductService } from 'src/app/shared/services/product/product.service';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public size = false;
  public page: number = 1;
  public totalLength!: number;
  public minValue: number = 200;
  public maxValue: number = 800;
  public filterSizeForm!: FormGroup;
  public options: Options = {
    floor: 0,
    ceil: 1000,
  };
  public buttonConfig = { type: 'button', text: 'read more', color: '#e43315' }
  public subCategory: ISubCategoryRequest[] = [];
  public product: IProductResponce[] = [];
  public subCategoryTitle = false;

  constructor(private activatedRoute: ActivatedRoute, private subCategoryService: SubCategoryService, private categoryService: CategoryService, private productService: ProductService, private fb: FormBuilder, private toast: ToastrService) { }

  ngOnInit(): void {
    const name = this.activatedRoute.snapshot.paramMap.get('name');
    this.initSizeForm();
    if (name == 'all') {
      this.loadCategory();
      this.loadAllProducts();
    } else {
      this.loadSubCategory(name)
      this.loadProductsByCategory(name)
      this.subCategoryTitle = true;
    }
  }

  initSizeForm() {
    this.filterSizeForm = this.fb.group({
      width: null,
      height: null,
      size: null
    })
  }

  filterBySize() {
    if (this.filterSizeForm.value.size && this.filterSizeForm.value.width && this.filterSizeForm.value.height) {
      this.productService.filterProductBySizeAll(this.filterSizeForm.value.size, this.filterSizeForm.value.height, this.filterSizeForm.value.width).then(data => {
        this.product = []
        data.forEach(elem => {
          this.product.push(elem.data() as IProductResponce)
        })
      })
    } else if (this.filterSizeForm.value.width && this.filterSizeForm.value.height) {
      this.productService.filterProductByWidthandHeight(this.filterSizeForm.value.height,this.filterSizeForm.value.width).then(data=>{
        this.product = []
        data.forEach(elem => {
          this.product.push(elem.data() as IProductResponce)
        })
      })
      this.initSizeForm()
    } else {
      if (this.filterSizeForm.value.width) {
        this.toast.error('Please choose height')
      } else if (this.filterSizeForm.value.height) {
        this.toast.error('Please choose width')
      }
    }
    if (this.filterSizeForm.value.size) {
      this.productService.filterProductBySize(this.filterSizeForm.value.size).then(data =>{
        this.product = []
        data.forEach(elem => {
          this.product.push(elem.data() as IProductResponce)
        })
      })
    }
  }


  loadProductByPrice() {
    this.productService.filterProductByPrice(this.minValue, this.maxValue).then(data => {
      this.product = []
      data.forEach(elem => {
        this.product.push(elem.data() as IProductResponce)
      })
    })
  }

  checkChange(path: string) {
    this.loadSubCategory(path)
    this.loadProductsByCategory(path)
    this.subCategoryTitle = true;
    if (path == 'tire') {
      this.size = true;
    }
  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(data => {
      this.subCategory = data;
    })
  }
  loadSubCategory(name: any) {
    if (name == 'tire') {
      this.size = true;
    }
    this.subCategoryService.loadSubCategoryNameFB(name).then(data => {
      this.subCategory = [];
      data.forEach(doc => {
        let subCategory = { ...doc.data() as ISubCategoryResponce }
        this.subCategory.push(subCategory)
      })
      this.loadProductsBysubCategory(name)

      if (this.subCategory.length == 0) {
       
      }
    })
  }
  loadAllProducts() {
    this.productService.loadproductFB().subscribe(data => {
      this.product = data;
      this.totalLength = data.lenght
    })
  }
  loadProductsByCategory(name: any) {
    this.productService.getProductCategory(name).then(data => {
      this.product = [];
      data.forEach(elem => {
        let product = { id: elem.id, ...elem.data() }
        this.product.push(product as IProductResponce);
      });
      this.totalLength = this.product.length
    })

  }
  loadProductsBysubCategory(name: any) {
    this.productService.getProductSubCategory(name).then(data => {
      console.log(name);
      if (name == 'tire') {
        this.size = true;
      }
      this.product = [];
      data.forEach(elem => {
        let product = { id: elem.id, ...elem.data() }
        this.product.push(product as IProductResponce);
      })
      this.totalLength = this.product.length
    })
  }
  loadSubCategoryALL() {
    this.subCategoryService.loadSubCategoryFB().subscribe(data => {
      this.subCategory = [];
      this.subCategory = data;
    })
  }
}
