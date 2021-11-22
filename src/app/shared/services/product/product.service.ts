import { Injectable } from '@angular/core';
import { doc, DocumentData, Firestore, getDocs, QuerySnapshot, setDoc, where, addDoc, collection, deleteDoc, getDoc, query } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { DocumentSnapshot } from 'rxfire/firestore/interfaces';
import { Observable, Subject } from 'rxjs';
import { IProductRequest, IProductResponce } from '../../interfaces/products/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public checkChange = new Subject<boolean>();

  constructor(private firestore: Firestore) { }

  loadproductFB(): Observable<any> {
    return collectionData(collection(this.firestore, 'products'), { idField: 'id' });
  }
  createProductFB(product: IProductRequest) {
    return addDoc(collection(this.firestore, 'products'), product);
  }
  editProducts(id: string, product: IProductRequest) {
    return setDoc(doc(this.firestore, 'products', id), product)
  }
  deleteProductFB(product: IProductResponce): Promise<void> {
    return deleteDoc(doc(this.firestore, "products", product.id))
  }
  getProductById(id: string): Promise<DocumentSnapshot<DocumentData>> {
    return getDoc(doc(this.firestore, 'products', id))
  }
}
