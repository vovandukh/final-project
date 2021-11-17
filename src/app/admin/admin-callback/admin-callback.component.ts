import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CallbackService } from 'src/app/shared/services/callback/callback.service';

@Component({
  selector: 'app-admin-callback',
  templateUrl: './admin-callback.component.html',
  styleUrls: ['./admin-callback.component.scss']
})
export class AdminCallbackComponent implements OnInit {
   public callback:any;
  constructor(private callbackService:CallbackService,private toast:ToastrService) { }

  ngOnInit(): void {
    this.loadCallback()
  }
  loadCallback(){
   this.callbackService.loadCallback().subscribe(data =>{
     this.callback = data;
   })
  }
  deleteCallback(id:string){
    this.callbackService.deleteCallback(id).then(()=>{
      this.loadCallback();
      this.toast.success('Delete success')
    }).catch(err =>{
      this.toast.error(err)
    })
  }

}
