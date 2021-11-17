import { Injectable } from '@angular/core';
import { doc, DocumentData, Firestore, getDocs, QuerySnapshot, setDoc, where,addDoc, collection, deleteDoc, getDoc, query } from '@angular/fire/firestore';
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
  editProducts(id:string, product:IProductRequest){
    return setDoc(doc(this.firestore, 'products',id),product)
  }
  deleteProductFB(product: IProductResponce): Promise<void> {
    return deleteDoc(doc(this.firestore, "products", product.id))
  }
  getProductCategory(name: any): Promise<QuerySnapshot<DocumentData>> {
    if(name == 'vossen'){
      let data = query(collection(this.firestore, "products"), where("brand", "==", name));
      return getDocs(data)
    }else{
      let data = query(collection(this.firestore, "products"), where("category.path", "==", name));
    return getDocs(data)
    }
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
  filterProductByPrice(minValue:number,maxValue:number): Promise<QuerySnapshot<DocumentData>>{ 
    let data = query(collection(this.firestore, "products"), where("price", ">=", minValue ), where("price", "<=", maxValue ));
    return getDocs(data)
  }
  filterProductBySizeAll(size:string,height:string,width:string): Promise<QuerySnapshot<DocumentData>>{ 
    let data = query(collection(this.firestore, "products"), where("size", "==", size ), where("width", "==", width ),where("height","==", height));
    return getDocs(data)
  }
  filterProductByWidthandHeight(height:string,width:string): Promise<QuerySnapshot<DocumentData>>{ 
    let data = query(collection(this.firestore, "products"), where("width", "==", width ),where("height","==", height));
    return getDocs(data)
  }
  filterProductBySize(size:string): Promise<QuerySnapshot<DocumentData>>{ 
    let data = query(collection(this.firestore, "products"), where("size", "==", size));
    return getDocs(data)
  }
}
