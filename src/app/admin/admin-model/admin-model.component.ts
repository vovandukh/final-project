import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelService } from 'src/app/shared/services/model/model.service';
import { IModelresponce } from 'src/app/shared/interfaces/model/model.interface';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-model',
  templateUrl: './admin-model.component.html',
  styleUrls: ['./admin-model.component.scss']
})
export class AdminModelComponent implements OnInit {
  public page: number = 1;
  public totalLength!: number;
  public formModel!: FormGroup;
  public model: IModelresponce[] = [];
  public modalOpen = {};

  constructor(
    private modelService: ModelService,
    private fb: FormBuilder,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.initModel();
    this.loadModel()
  }
  initModel() {
    this.formModel = this.fb.group({
      brand: [null, Validators.required],
    })
  }
  createModel() {
    this.modelService.createModelFB(this.formModel.value).then(() => {
      this.loadModel();
      this.modalOpen = { 'display': 'none' };
      this.initModel();
      this.toast.success('Create success')
    })
  }
  loadModel() {
    this.modelService.loadModelFB().subscribe(data => {
      this.model = data;
      this.totalLength = data.length

    })
  }
  deleteModel(id: string) {
    this.modelService.deleteModel(id).then(() => {
      this.loadModel();
      this.toast.success('Delete success')
    }).catch(err => {
      this.toast.error(err)
    })
  }
  openModal(status: any) {
    if (status) {
      this.modalOpen = { 'display': 'block' };
    } else {
      this.modalOpen = { 'display': 'none' };
    }
  }
}
