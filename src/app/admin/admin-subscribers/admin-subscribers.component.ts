import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscribersService } from 'src/app/shared/services/subscribers/subscribers.service';

@Component({
  selector: 'app-admin-subscribers',
  templateUrl: './admin-subscribers.component.html',
  styleUrls: ['./admin-subscribers.component.scss']
})
export class AdminSubscribersComponent implements OnInit {
  public subscribers: any;
  constructor(private subscribersService: SubscribersService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.loadSubscribers()
  }
  loadSubscribers() {
    this.subscribersService.loadSubscribers().subscribe(data => {
      this.subscribers = data
    })
  }
  deleteSubscribers(id:string){
     this.subscribersService.deleteSubscribers(id).then(()=>{
       this.loadSubscribers()
       this.toast.success('Delete success')
     })
  }
}
