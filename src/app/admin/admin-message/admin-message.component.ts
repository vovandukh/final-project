import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MassegeService } from 'src/app/shared/services/massege/massege.service';

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
export class AdminMessageComponent implements OnInit {
  public message: any;
  constructor(private messageService: MassegeService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadMessage()
  }
  loadMessage(){
    this.messageService.loadMessage().subscribe(data =>{
      this.message = data
    })
  }
  
  deleteMessage(id:string){
   this.messageService.deleteMessage(id).then(()=>{
    this.loadMessage();
    this.toast.success('Delete success')
   }).catch(err =>{
     this.toast.error(err)
   })
  }
}
