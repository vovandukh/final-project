import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MassegeService {

  constructor(private firestore:Firestore) { }
  createMessage(message:any){
    return addDoc(collection(this.firestore , 'message'),message)  
  }
  loadMessage(){
    return collectionData(collection(this.firestore,'message'),{idField: 'id'})
  }
  deleteMessage(id:string){
    return deleteDoc(doc(this.firestore, 'message',id))
  }
}
