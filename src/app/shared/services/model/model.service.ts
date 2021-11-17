import { Injectable } from '@angular/core';
import { doc, DocumentData, Firestore, getDocs, QuerySnapshot, where } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDoc, query } from '@firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { IModelrequest } from '../../interfaces/model/model.interface';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private firestore:Firestore) { }

  createModelFB(model:IModelrequest){
    return addDoc(collection(this.firestore,'model'),model)
  }
  loadModelFB():Observable<any>{
    return collectionData(collection(this.firestore,'model'),{idField:'id'})
  }
  deleteModel(id:string){
    return deleteDoc(doc(this.firestore,'model',id))
  }
}
