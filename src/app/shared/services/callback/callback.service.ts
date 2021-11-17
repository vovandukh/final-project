import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CallbackService {

  constructor(private firestore:Firestore) { }

  createCallback(subscribers:any){
    return addDoc(collection(this.firestore , 'callback'),subscribers)  
  }
  loadCallback(){
    return collectionData(collection(this.firestore,'callback'),{idField: 'id'})
  }
  deleteCallback(id:string){
    return deleteDoc(doc(this.firestore, 'callback',id))
  }
}
