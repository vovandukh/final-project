import { Injectable } from '@angular/core';
import { addDoc, collection, DocumentData, DocumentSnapshot, Firestore, getDoc, getDocs, query, where,collectionData, doc } from '@angular/fire/firestore';
import { INewsRequest } from '../../interfaces/news/news.inteface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private firestore:Firestore) { }

  loadNews(){
    return collectionData(collection(this.firestore, 'news'),{idField: 'id'})
  }

  createNews(news:INewsRequest){
    return addDoc(collection(this.firestore, 'news'),news)
  }
  loadNewsByTag(tag:string){
    let data = query(collection(this.firestore, "news"), where("tags", "==", tag));
    return getDocs(data)
  }
  getNewsById(id:string):Promise<DocumentSnapshot<DocumentData>>{
    return getDoc(doc(this.firestore,'news',id))
  }
}
