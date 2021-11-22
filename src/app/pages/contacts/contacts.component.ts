import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MassegeService } from 'src/app/shared/services/massege/massege.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public messageForm!:FormGroup;
  constructor(private fb:FormBuilder,private messageService:MassegeService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.initMessageForm()
  }
  
  initMessageForm(){
    this.messageForm = this.fb.group({
      name:[null,Validators.required],
      email:[null,Validators.email],
      subject:[null,Validators.required],
      message:[null,Validators.required],
    })
  }
  
  setMessage(){
    let status = false
    for (const key in this.messageForm.value) {
      if(this.messageForm.controls[key].errors || !this.messageForm.controls[key].value){
        document.getElementById(key)?.classList.add('invalid')
        this.toast.error('Invalid', key.toUpperCase());
        status = false;
        break;
      }else{
        document.getElementById(key)?.classList.remove('invalid');
        status = true;
      }
    }
     if(status){
      this.messageService.createMessage(this.messageForm.value).then(()=>{
        this.toast.success('Message sent')
      })
     }
  }

}
