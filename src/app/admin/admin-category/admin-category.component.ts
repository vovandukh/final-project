import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { getDownloadURL, ref, Storage, uploadBytes, uploadBytesResumable } from '@angular/fire/storage';
import { ICategoryRequest, ICategoryResponce } from 'src/app/shared/interfaces/category/category.interface';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  public categoryForm!: FormGroup;
  public category: ICategoryResponce[] = [];
  public editStatus:boolean = false;
  public categoryID:string = '';
  public modalOpen = {'display': 'none'};
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initFormCategory()
    this.loadCategory();
  }

  initFormCategory() {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
      path:[null, Validators.required]
    })
  }

  loadCategory() {
    this.categoryService.loadCategory().subscribe(category => {
      this.category = category;
      console.log(category);

    })
  }
 
  saveCategory(): void {
   if(this.editStatus){
     this.categoryService.updateCategory(this.categoryForm.value,this.categoryID).then(()=>{
       this.loadCategory();
       this.editStatus = false;
       this.modalOpen = {'display': 'none'};
     })
   }else{
    this.categoryService.createCategoryFB(this.categoryForm.value).then(() => {
      this.initFormCategory();
      this.loadCategory();
      this.modalOpen = {'display': 'none'};
    })
   }
  }
  editCategory(category:ICategoryResponce){
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description,
      imagePath: category.imagePath,
      path:category.path
    })
    this.editStatus = true;
    this.categoryID = category.id;
    this.modalOpen = {'display': 'block'};
  }
  deleteCategory(category:ICategoryResponce){
    this.categoryService.deleteCategoryFB(category).then(()=>{
      this.loadCategory();
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
  close(){
   this.modalOpen = {'display': 'none'};
  }
  open(){
    this.modalOpen = {'display': 'block'};
  }
}
