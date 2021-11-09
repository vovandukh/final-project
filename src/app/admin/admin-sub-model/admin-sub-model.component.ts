import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IModelrequest, IModelresponce } from 'src/app/shared/interfaces/model/model.interface';
import { ISubModelResponce } from 'src/app/shared/interfaces/sub-model/sub-model.inteface';
import { ModelService } from 'src/app/shared/services/model/model.service';
import { SubModelService } from 'src/app/shared/services/sub-model/sub-model.service';

@Component({
  selector: 'app-admin-sub-model',
  templateUrl: './admin-sub-model.component.html',
  styleUrls: ['./admin-sub-model.component.scss']
})
export class AdminSubModelComponent implements OnInit {
  public modalOpen = {};
  public model: IModelresponce[] = [];
  public subModelForm!: FormGroup;
  public subModel: ISubModelResponce[] = []
  constructor(private modelService: ModelService, private fb: FormBuilder, private subModelService: SubModelService) { }

  ngOnInit(): void {
    this.loadModel();
    this.initSubModel();
    this.loadSubModel();
  }

  initSubModel() {
    this.subModelForm = this.fb.group({
      brand: [null, Validators.required],
      model: [null, Validators.required]
    })
  }

  loadModel() {
    this.modelService.loadModelFB().subscribe(data => {
      this.model = data;
    })
  }
  loadSubModel() {
    this.subModelService.loadSubModel().subscribe(data => {
      this.subModel = data;
    })
  }
  createSubModel() {
    this.subModelService.createSubModel(this.subModelForm.value).then(() => {
      this.initSubModel();
      this.loadSubModel();
      this.modalOpen = { 'display': 'none' };
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
