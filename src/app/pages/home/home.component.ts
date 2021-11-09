import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 public modalCallback= {}
  constructor() { }

  ngOnInit(): void {
  }

  openModalCallback(status:any){
   if(status){
     this.modalCallback = {'display': 'block'}
   }else{
    this.modalCallback = {'display': 'none'}
   }
  }

}
