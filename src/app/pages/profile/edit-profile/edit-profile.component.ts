import { Component, OnInit } from '@angular/core';
import { doc, Firestore,setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public user:any;
  public formUser!:FormGroup;

  constructor(private fb:FormBuilder,private toast:ToastrService,private firestore:Firestore) { }

  ngOnInit(): void {
    this.loadUser();
    this.initFormUser()
  }
  loadUser(){
    if(localStorage.length > 0 && localStorage.getItem('users')){
      let user = JSON.parse(localStorage.getItem('users') as string)
      if(user.role === "USER"){
        this.user = user;
      }
    }
  }
  initFormUser(){
    this.formUser = this.fb.group({
      id: this.user.id,
      name:[null,Validators.required],
      email:this.user.email,
      phoneNumber:[null,Validators.required],
      country:[null,Validators.required],
      city:[null,Validators.required],
      address:[null,Validators.required],
      photoURL:null,
      orders:null,
      role:'USER'
    })
    if(this.user.name){
      this.formUser.patchValue({
        name:this.user.name
      })
    }
    if(this.user.photoURL){
      this.formUser.patchValue({
        photoURL:this.user.photoURL
      })
    }
  }

  updateUser(){
    this.formUser.patchValue({
      orders: []
    })
    localStorage.setItem('users', JSON.stringify(this.formUser.value))
     setDoc(doc(this.firestore,"users",this.user.id ),this.formUser.value).then(()=>{
      this.toast.success('Update success');
      this.initFormUser();
    })
  }

}
