import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { ISubCategoryRequest, ISubCategoryResponce } from 'src/app/shared/interfaces/sub-category/sub-category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category/sub-category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public category: ISubCategoryResponce[] = [];
  public subCategory:ISubCategoryResponce[]=[];
  public productForm!:FormGroup;
  public product:IProductResponce[] = [];
  public modalOpen = {};
  public name!:any; 
  constructor(private subCategoryService: SubCategoryService,private categoryService:CategoryService, private fb: FormBuilder, private productService: ProductService,private storage:Storage) { }

  ngOnInit(): void {
    this.loadCategory();
    this.initProductForm();
    this.loadProducs();
  }

  initProductForm(){
    this.productForm = this.fb.group({
      name:[null,Validators.required],
      brand:[null,Validators.required],
      category:[null,Validators.required],
      subCategory:[null,Validators.required],
      description:[null,Validators.required],
      price:[null,Validators.required],
      imagePath:[null,Validators.required],
      count:1
    })
  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(data =>{
      this.category = data;
    })
  }
  loadSubCategory(path:any) {
    this.subCategoryService.loadSubCategoryNameFB(this.name.path).then(data => {
      this.subCategory =[];
     data.forEach(elem =>{
      this.subCategory.push(elem.data() as ISubCategoryResponce) 
      
     })
      
    })
  }

  loadProducs(){
    this.productService.loadproductFB().subscribe(data =>{
      this.product = data;
      console.log(data);
    })
  }
  saveProducts(){
    this.productService.createProductFB(this.productForm.value).then(()=>{
      this.loadCategory();
      this.initProductForm();
      this.modalOpen = {'display': 'none'};
    })
  }
  deleteProducts(product:IProductResponce){
    this.productService.deleteProductFB(product).then(()=>{
      this.loadProducs();
    })
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('products', file.name, file)
      .then(data => {
        if(!this.productForm.controls['imagePath'].value){
          this.productForm.patchValue({
            imagePath: data
          })
        } else if(!this.productForm.controls['imagePath1'].value){
          this.productForm.patchValue({
            imagePath1: data
          })
        } else if(!this.productForm.controls['imagePath2'].value){
          this.productForm.patchValue({
            imagePath2: data
          })
        } else if(!this.productForm.controls['imagePath3'].value){
          this.productForm.patchValue({
            imagePath3: data
          })
        } else if(!this.productForm.controls['imagePath4'].value){
          this.productForm.patchValue({
            imagePath4: data
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format')
    }
    return Promise.resolve(url);
  }

  close() {
    this.modalOpen = {'display': 'none'};
  }
  open() {
    this.modalOpen = {'display': 'block'};
  }

}
