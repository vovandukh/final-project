import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';
import { ISubCategoryResponce } from 'src/app/shared/interfaces/sub-category/sub-category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category/sub-category.service';

@Component({
  selector: 'app-admin-sub-category',
  templateUrl: './admin-sub-category.component.html',
  styleUrls: ['./admin-sub-category.component.scss']
})
export class AdminSubCategoryComponent implements OnInit {
  public category: ICategoryResponce[] = [];
  public subCategory: ISubCategoryResponce[] = [];
  public subCategoryForm!: FormGroup;
  public editStatus:boolean = false;
  public subCategoryID:string = '';
  public modalOpen = {};


  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService, private fb: FormBuilder, private storage: Storage) { }

  ngOnInit(): void {
    this.loadCategory();
    this.initSubCategory();
    this.loadSubCategory();
  }
  initSubCategory() {
    this.subCategoryForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
    })
  }
  loadCategory() {
    this.categoryService.loadCategory().subscribe(category => {
      this.category = category;
    })
  }
  loadSubCategory() {
    this.subCategoryService.loadSubCategoryFB().subscribe(subCategory => {
      this.subCategory = subCategory;
    })
  }
  saveSubCategory() {
    if(this.editStatus){
    this.subCategoryService.updateSubCategoryFB(this.subCategoryForm.value,this.subCategoryID).then(()=>{
      this.loadCategory();
      this.editStatus = false;
      this.modalOpen = {'display': 'none'};
    })
    }else{
      this.subCategoryService.createSubCategoryFB(this.subCategoryForm.value).then(() => {
        this.loadSubCategory();
        this.initSubCategory();
        this.modalOpen = {'display': 'none'};
      })
    }
  }
  editSubCategory(subCategory:ISubCategoryResponce){
    this.subCategoryForm.patchValue({
      category: subCategory.category,
      name: subCategory.name,
      path: subCategory.path,
    })
    this.editStatus = true;
    this.subCategoryID = subCategory.id;
    this.modalOpen = {'display': 'block'};
  }
  deleteSubCategory(SubCategory:ISubCategoryResponce){
    console.log(SubCategory);
    this.subCategoryService.deleteSubCategoryFB(SubCategory).then(()=>{
      this.loadSubCategory()
    })
  }
  openModal(status:any){
    if(status){
     this.modalOpen = {'display': 'block'};
    }else{
     this.modalOpen = {'display': 'none'};
    }
   }
}
