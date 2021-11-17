import { Component, OnInit } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  public page:number = 1;
  public totalLength!:number;
  public category: ICategoryResponce[] = [];
  public subCategory: ISubCategoryResponce[] = [];
  public subCategoryForm!: FormGroup;
  public editStatus:boolean = false;
  public subCategoryID:string = '';
  public modalOpen = {};


  constructor(private categoryService: CategoryService, private subCategoryService: SubCategoryService, private fb: FormBuilder,private toast:ToastrService) { }

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
      this.totalLength = subCategory.length;
    })
  }
  saveSubCategory() {
    if(this.editStatus){
    this.subCategoryService.updateSubCategoryFB(this.subCategoryForm.value,this.subCategoryID).then(()=>{
      this.loadCategory();
      this.editStatus = false;
      this.modalOpen = {'display': 'none'};
      this.toast.success('Edit success')
    }).catch(err =>{
      this.toast.error(err)
    })
    }else{
      this.subCategoryService.createSubCategoryFB(this.subCategoryForm.value).then(() => {
        this.loadSubCategory();
        this.initSubCategory();
        this.modalOpen = {'display': 'none'};
        this.toast.success('Sub category created')
      }).catch(err =>{
        this.toast.error(err)
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
    this.subCategoryService.deleteSubCategoryFB(SubCategory).then(()=>{
      this.loadSubCategory()
      this.toast.success('Delete success')
    }).catch(err =>{
      this.toast.error(err)
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
