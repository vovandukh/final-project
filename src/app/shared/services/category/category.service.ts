import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, DocumentReference,setDoc} from '@firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { Observable, Subject } from 'rxjs';
import { ICategoryRequest, ICategoryResponce } from '../../interfaces/category/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public changeCategory = new Subject<boolean>();

  constructor(
    private firestore:Firestore
  ) { }
  loadCategory():Observable<any>{
    return collectionData(collection(this.firestore,'category'),{idField:'id'})
  }
  createCategoryFB(category:ICategoryRequest):Promise<DocumentReference<DocumentData>>{
     return addDoc(collection(this.firestore,'category'),category)
  }
  deleteCategoryFB(category:ICategoryResponce):Promise<void>{
    return deleteDoc(doc(this.firestore,'category',category.id))
  }
  updateCategory(newCategory:ICategoryRequest,id:string){
    return setDoc(doc(this.firestore, 'category',id),newCategory)
  }
}
