import { Component, OnInit } from '@angular/core';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { ISubCategoryResponce } from 'src/app/shared/interfaces/sub-category/sub-category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category/sub-category.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  public size = false;
  public page: number = 1;
  public totalLength!: number;
  public category: ISubCategoryResponce[] = [];
  public subCategory: ISubCategoryResponce[] = [];
  public productForm!: FormGroup;
  public product: IProductResponce[] = [];
  public modalOpen = {};
  public editStatus = false;
  public isUploaded = false
  public productID!: string;
  public name!: any;
  public subCategoryName: any;
  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private storage: Storage,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadCategory();
    this.initProductForm();
    this.loadProducs();
  }

  initProductForm() {
    this.productForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      category: [null, Validators.required],
      subCategory: [null],
      description: [null, Validators.required],
      price: [null, Validators.required],
      imagePath: [null, Validators.required],
      width: null,
      height: null,
      size: null,
      count: 1
    })
  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(data => {
      this.category = data;
    })
  }
  loadSubCategory() {
    this.subCategoryService.loadSubCategoryNameFB(this.name.path).then(data => {
      this.subCategory = [];
      data.forEach(elem => {
        this.subCategory.push(elem.data() as ISubCategoryResponce)
      })
    }).catch(err => {
      this.toast.error(err)
    })
  }

  loadProducs() {
    this.productService.loadproductFB().subscribe(data => {
      this.product = data;
      this.totalLength = data.length;
    })
  }
  saveProducts() {
    if (this.editStatus) {
      this.productService.editProducts(this.productID, this.productForm.value).then(() => {
        this.loadProducs();
        this.initProductForm()
        this.size = false;
        this.editStatus = false;
        this.isUploaded = false;
        this.toast.success('Edit success');
        this.modalOpen = { 'display': 'none' };
      }).catch(err => {
        this.toast.error(err)
      })
    } else {
      this.productService.createProductFB(this.productForm.value).then(() => {
        this.loadCategory();
        this.initProductForm();
        this.modalOpen = { 'display': 'none' };
        this.isUploaded = false;
        this.size = false;
        this.toast.success('Product created')
      })
    }
  }
  editProduct(products: IProductResponce) {
    this.productForm.patchValue({
      name: products.name,
      brand: products.brand,
      category: products.category,
      subCategory: products.subCategory,
      description: products.description,
      price: products.price,
      imagePath: products.imagePath,
      width: products.width,
      height: products.height,
      size: products.size,
    })
    this.editStatus = true;
    this.isUploaded = true;
    this.productID = products.id;
    console.log(this.productID);

    this.modalOpen = { 'display': 'block' };
  }
  deleteProducts(product: IProductResponce) {
    this.productService.deleteProductFB(product).then(() => {
      this.loadProducs();
      this.toast.success('Delete success')
    }).catch(err => {
      this.toast.error(err)
    })
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('products', file.name, file)
      .then(data => {
        if (!this.productForm.controls['imagePath'].value) {
          this.productForm.patchValue({
            imagePath: data
          })
          this.isUploaded = true;
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

  loadSize() {
    if (this.subCategoryName.name == 'Tire') {
      this.size = true;
    } else {
      this.size = false;
    }
  }
  deleteImage(imagePath?: string): void {
    imagePath = imagePath ? imagePath : this.valueByControl('imagePath')
    this.isUploaded = false;
    const task = ref(this.storage, imagePath);
    deleteObject(task).then(() => {
      this.toast.success('File deleted successfully')
      this.productForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control:string):string{
      return this.productForm.get(control)?.value;
  }

  openModal(status: any) {
    if (status) {
      this.modalOpen = { 'display': 'block' };
    } else {
      this.modalOpen = { 'display': 'none' };
    }
  }

}
