import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, uploadBytesResumable, Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { INewsResponce } from 'src/app/shared/interfaces/news/news.inteface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {
  public newsID!: string;
  public editStatus = false;
  public page: number = 1;
  public totalLength!: number;
  public newsForm!: FormGroup;
  public news: INewsResponce[] = [];
  public modalOpen = { 'display': 'none' };
  public date = new Date
  public months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  constructor(
    private storage: Storage,
    private fb: FormBuilder,
    private newsService: NewsService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initNews();
    this.loadNews();
  }

  loadNews() {
    this.newsService.loadNews().subscribe(data => {
      this.news = data as INewsResponce[];
    })
  }

  editNews(news: INewsResponce) {
    this.newsForm.patchValue({
      name: news.name,
      videoPath: news.videoPath,
      description: news.description,
      tags: news.tags,
      imagePath: news.imagePath,
      date: news.date
    })
    this.editStatus = true;
    this.newsID = news.id;
    this.modalOpen = { 'display': 'block' };
  }

  deleteNews(id: string) {
    this.newsService.deleteNews(id).then(()=>{
      this.loadNews()
      this.toast.success('Delete success')
    }).catch(err =>{
      this.toast.error(err)
    })
  }

  saveNews() {
    if (this.editStatus) {
      this.newsService.editNews(this.newsID, this.newsForm.value).then(() => {
        this.loadNews()
        this.initNews();
        this.modalOpen = { 'display': 'none' };
        this.toast.success('Edit success')
      }).catch(err => {
        this.toast.error(err)
      })
    } else {
      this.newsForm.patchValue({
        date: this.months[this.date.getMonth()] + ' ' + this.date.getDate() + ',' + this.date.getFullYear()
      })
      this.newsService.createNews(this.newsForm.value).then(() => {
        this.initNews();
        this.loadNews();
        this.modalOpen = { 'display': 'none' };
        this.toast.success('Create success')
      }).catch(err => {
        this.toast.error(err)
      })
    }
  }
  initNews() {
    this.newsForm = this.fb.group({
      name: [null, Validators.required],
      videoPath: null,
      description: [null, Validators.required],
      tags: [null, Validators.required],
      imagePath: [null, Validators.required],
      date: null
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
  openModal(status: any) {
    if (status) {
      this.modalOpen = { 'display': 'block' };
    } else {
      this.modalOpen = { 'display': 'none' };
    }
  }

}
