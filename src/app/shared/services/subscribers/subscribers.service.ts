import { Injectable } from '@angular/core';
import { Firestore,addDoc, doc, collection } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private firestore:Firestore) { }

  createSubscribers(subscribers:any){
    return addDoc(collection(this.firestore , 'subscribers'),subscribers)  
  }
  loadSubscribers(){
    return collectionData(collection(this.firestore,'subscribers'),{idField: 'id'})
  }
  deleteSubscribers(id:string){
    return deleteDoc(doc(this.firestore, 'subscribers',id))
  }

}
