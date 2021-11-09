import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelService } from 'src/app/shared/services/model/model.service';
import { IModelrequest, IModelresponce } from 'src/app/shared/interfaces/model/model.interface';


@Component({
  selector: 'app-admin-model',
  templateUrl: './admin-model.component.html',
  styleUrls: ['./admin-model.component.scss']
})
export class AdminModelComponent implements OnInit {
  public formModel!:FormGroup;
  public model:IModelresponce[] = [];
  public modalOpen ={};

  constructor(private modelService:ModelService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initModel();
    this.loadModel()
  }
  initModel(){
    this.formModel = this.fb.group({
      brand:[null,Validators.required],
    })
  }
  createModel(){
    this.modelService.createModelFB(this.formModel.value).then(()=>{
     this.loadModel();
     this.modalOpen = {'display': 'none'};
     this.initModel();
    })
  }
  loadModel(){
   this.modelService.loadModelFB().subscribe(data =>{
     this.model = data ;
     console.log(data);
     
   })
  }
  openModal(status:any){
   if(status){
    this.modalOpen = {'display': 'block'};
   }else{
    this.modalOpen = {'display': 'none'};
   }
  }
}
