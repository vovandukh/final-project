import { Injectable } from '@angular/core';
import { DocumentData, DocumentReference, Firestore, query, where,QuerySnapshot, doc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, setDoc } from '@firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { ICategoryRequest, ICategoryResponce } from '../../interfaces/category/category.interface';
import { ISubCategoryRequest, ISubCategoryResponce } from '../../interfaces/sub-category/sub-category.interface';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private firestore:Firestore) { }

  createSubCategoryFB(subCategory:ISubCategoryRequest):Promise<DocumentReference<DocumentData>>{
    return addDoc(collection(this.firestore,'sub-categories'),subCategory)
  }
  loadSubCategoryFB():Observable<any>{
    return collectionData(collection(this.firestore,'sub-categories'),{idField:'id'})
  }
  loadSubCategoryNameFB(name:any):Promise<QuerySnapshot<DocumentData>>{
    let data = query(collection(this.firestore, "sub-categories"), where("category.path", "==", name)); 
    return getDocs(data)
  }
  deleteSubCategoryFB(subCategory:ISubCategoryResponce):Promise<void>{
    return deleteDoc(doc(this.firestore,"sub-categories",subCategory.id))
  }
  updateSubCategoryFB(newSubCategory:ICategoryRequest,id:string){
    return setDoc(doc(this.firestore,"sub-categories",id),newSubCategory)
  }
}

