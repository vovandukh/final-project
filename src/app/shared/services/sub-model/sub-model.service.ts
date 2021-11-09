import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, DocumentData, Firestore, getDocs, query, QuerySnapshot, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ISubModelRequest } from '../../interfaces/sub-model/sub-model.inteface';

@Injectable({
  providedIn: 'root'
})
export class SubModelService {

  constructor(private firestore:Firestore) { }

  createSubModel(subModel:ISubModelRequest){
    return addDoc(collection(this.firestore,'sub-model'),subModel)
  }
  loadSubModel():Observable<any>{
    return collectionData(collection(this.firestore,'sub-model'),{idField:'id'})
  }
 loadSubModelByBrand(brand:string): Promise<QuerySnapshot<DocumentData>> {
    let data = query(collection(this.firestore, "sub-model"), where("brand.brand", "==", brand));
    return getDocs(data)
  }
}
