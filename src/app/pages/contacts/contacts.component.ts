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
  public invalidName ={}
  public invalidEmail ={}
  public invalidSubject ={}
  public invalidMessage ={}
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
  
  setMessage(event:any){
    console.log(event.target);
    console.log(this.messageForm.controls.email);
    
    if(this.messageForm.controls.name.errors != null){
       this.toast.error('Please enter Name')
       this.invalidName = {'border': "1px solid red"}
    } else if(this.messageForm.controls.email.errors != null){
      this.toast.error('Invalid Email')
      this.invalidEmail = {'border': "1px solid red"}
    } else if(this.messageForm.controls.email.value == null){
      this.toast.error('Please enter Email')
      this.invalidEmail = {'border': "1px solid red"}
    }else if(this.messageForm.controls.subject.errors != null){
      this.toast.error('Please enter subject')
      this.invalidSubject = {'border': "1px solid red"}
    } else if(this.messageForm.controls.message.errors != null){
      this.toast.error('Please enter message')
      this.invalidMessage = {'border': "1px solid red"}
    }else{
      this.messageService.createMessage(this.messageForm.value).then(()=>{
        this.toast.success('Message sent')
        this.invalidEmail={}
        this.invalidName={}
        this.invalidSubject={}
        this.invalidMessage={}
      })
    }
  }

}
