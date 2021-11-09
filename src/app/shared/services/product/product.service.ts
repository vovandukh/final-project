import { Injectable } from '@angular/core';
import { doc, DocumentData, Firestore, getDocs, QuerySnapshot, where } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDoc, query } from '@firebase/firestore';
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
  deleteProductFB(product: IProductResponce): Promise<void> {
    return deleteDoc(doc(this.firestore, "products", product.id))
  }
  getProductCategory(name: any): Promise<QuerySnapshot<DocumentData>> {
    let data = query(collection(this.firestore, "products"), where("category.path", "==", name));
    return getDocs(data)
  }
  getProductSubCategory(name: any): Promise<QuerySnapshot<DocumentData>> {
    let data = query(collection(this.firestore, "products"), where("subCategory.path", "==", name));
    return getDocs(data)
  }
  getProductByBrand(name: any): Promise<QuerySnapshot<DocumentData>> {
    let data = query(collection(this.firestore, "products"), where("brand", "==", name));
    return getDocs(data)
  }
  getProductById(id:string):Promise<DocumentSnapshot<DocumentData>>{
    return getDoc(doc(this.firestore,'products',id))
  }
}
