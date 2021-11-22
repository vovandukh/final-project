import { Injectable } from '@angular/core';
import { addDoc, collection, DocumentData, DocumentSnapshot, Firestore, getDoc, getDocs, query, where,collectionData, doc, setDoc } from '@angular/fire/firestore';
import { deleteDoc } from '@firebase/firestore';
import { INewsRequest, INewsResponce } from '../../interfaces/news/news.inteface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestore:Firestore) { }

  loadNews(){
    return collectionData(collection(this.firestore, 'news'),{idField: 'id'})
  }

  editNews(id:string,news:INewsResponce){
   return setDoc(doc(this.firestore,'news',id),news)
  }

  deleteNews(id:string){
    return deleteDoc(doc(this.firestore , 'news', id))
  }

  createNews(news:INewsRequest){
    return addDoc(collection(this.firestore, 'news'),news)
  }
  getNewsById(id:string):Promise<DocumentSnapshot<DocumentData>>{
    return getDoc(doc(this.firestore,'news',id))
  }
}
