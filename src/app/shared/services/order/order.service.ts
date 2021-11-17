import { Injectable } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc } from '@firebase/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable, Subject } from 'rxjs';
import { IOrderRequvest } from '../../interfaces/order/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public checkBasket = new Subject<boolean>()
  constructor(private firestore:Firestore) { }

  createOrder(order:IOrderRequvest){
    return addDoc(collection(this.firestore, 'orders'),order)
  }
  loadOrder():Observable<any>{
    return collectionData(collection(this.firestore,'orders'),{idField:'id'})
  }
  deleteOrders(id:string){
    return deleteDoc(doc(this.firestore, 'orders', id))
  }
}
