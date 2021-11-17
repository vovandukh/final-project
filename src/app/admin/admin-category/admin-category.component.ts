import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { getDownloadURL, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import {  ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit{
  public page:number = 1;
  public totalLength!:number;
  public categoryForm!: FormGroup;
  public category: any;
  public chekData = false
  public editStatus: boolean = false;
  public categoryID: string = '';
  public modalOpen = { 'display': 'none' };
  public authSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storage: Storage,
    private toast:ToastrService
  ) { }

  ngOnInit(): void {
    this.initFormCategory();
    this.loadCategory();
  }

  initFormCategory() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
      path: [null, Validators.required]
    })
  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(category => {
      this.category = []
      this.category = category;
      this.totalLength = category.length;
    })
  }


  saveCategory(): void {
    if (this.editStatus) {
      this.categoryService.updateCategory(this.categoryForm.value, this.categoryID).then(() => {
        this.loadCategory();
        this.editStatus = false;
        this.modalOpen = { 'display': 'none' };
        this.toast.success('Edit success')
      }).catch(err =>{
        this.toast.error(err)
      })
    } else {
      this.categoryService.createCategoryFB(this.categoryForm.value).then(() => {
        this.initFormCategory();
        this.loadCategory();
        this.modalOpen = { 'display': 'none' };
        this.toast.success('Category created')
      }).catch(err =>{
        this.toast.error(err)
      })
    }
  }
  editCategory(category: ICategoryResponce) {
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
      imagePath: category.imagePath,
      path: category.path
    })
    this.editStatus = true;
    this.categoryID = category.id;
    this.modalOpen = { 'display': 'block' };
  }
  deleteCategory(category: ICategoryResponce) {
    this.categoryService.deleteCategoryFB(category).then(() => {
      this.loadCategory();
      this.toast.success('Delete success')
    }).catch(err =>{
      this.toast.error(err)
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('category', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        console.log(this.categoryForm);
      })
      .catch(err => {
        this.toast.error(err)
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
        this.toast.error(e)
      }
    } else {
      this.toast.error('Wrong format')
    }
    return Promise.resolve(url);
  }

  openModal(status: any) {
    if (status) {
      this.modalOpen = { 'display': 'block' };
    } else {
      this.modalOpen = { 'display': 'none' };
    }
  }
}
