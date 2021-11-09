import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, uploadBytesResumable,Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { INewsResponce } from 'src/app/shared/interfaces/news/news.inteface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {
  public newsForm!:FormGroup;
  public news:INewsResponce[] = [];
  public modalOpen = {'display': 'none'};
  public date = new Date
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(private storage:Storage,private fb:FormBuilder,private newsService:NewsService) { }

  ngOnInit(): void {
    this.initNews();
    this.loadNews();
  }

  loadNews(){
    this.newsService.loadNews().subscribe(data =>{
    this.news = data as INewsResponce[];
    console.log(this.news);
    
    })
  }

  saveNews(){
    this.newsForm.patchValue({
      date: this.months[this.date.getMonth()] + ' ' + this.date.getDate() + ',' + this.date.getFullYear()
    })
    this.newsService.createNews(this.newsForm.value).then(()=>{
      this.initNews();
      this.loadNews();
      this.modalOpen = {'display': 'none'};
    })
  }
  initNews(){
    this.newsForm = this.fb.group({
      name:[null , Validators.required],
      videoPath:null,
      description:[null , Validators.required],
      tags:[null , Validators.required],
      imagePath:[null , Validators.required] ,
      date:null 
    })
  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('news', file.name, file)
      .then(data => {
        this.newsForm.patchValue({
          imagePath: data
        });
        console.log(this.newsForm);
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const ext = file!.name.split('.').pop();
    const path = `${folder}/${name}.${ext}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format')
    }
    return Promise.resolve(url);
  }
  openModal(status:any){
    if(status){
     this.modalOpen = {'display': 'block'};
    }else{
     this.modalOpen = {'display': 'none'};
    }
   }

}
