import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CallbackService } from 'src/app/shared/services/callback/callback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 public modalCallback= {}
 public formModalCallback!:FormGroup;
  constructor(private fb:FormBuilder,private callbackService:CallbackService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.initFormModalCallback()
  }

  initFormModalCallback(){
   this.formModalCallback = this.fb.group({
     name:[null,Validators.required],
     phoneNumber:[null,Validators.pattern('[0-9]{10}')]
   })
  }
  setCallback(event:any){
    if(this.formModalCallback.controls.phoneNumber.errors != null){
    this.toast.error('Invalide Phone');
    event.target.children[1].style = "border: 1px solid red"
    }else if(this.formModalCallback.controls.name.value == null){
      this.toast.error('Please enter name');
      event.target.children[0].style = "border: 1px solid red"
    }else{
      this.callbackService.createCallback(this.formModalCallback.value).then(()=>{
        this.toast.success('Callback creations');
        this.initFormModalCallback()
        event.target.children[1].style = "border: 1px solid rgb(222, 222, 222)"
      })
    }
  }


  openModalCallback(status:any){
   if(status){
     this.modalCallback = {'display': 'block'}
   }else{
    this.modalCallback = {'display': 'none'}
   }
  }

}
