import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import {  IOrderResponce } from 'src/app/shared/interfaces/order/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  public page:number = 1;
  public totalLength!:number;
  public orders: any = []

  constructor(private orderService: OrderService,private firestore:Firestore ,private toast:ToastrService) { }

  ngOnInit(): void {
    this.loadOrder()
  }

  loadOrder() {
    this.orderService.loadOrder().subscribe(data => {
      this.orders = data;
      this.totalLength = data.length;
    })
  }
  changeStatus(event: any, item:IOrderResponce) {
    let value = event.target.value;
    this.orders.forEach((elem:any) => {
      if (elem.id === item.id) {
        elem.status = value
      }
    })
    setDoc(doc(this.firestore , 'orders',item.id),item)
  }
  deleteOrders(id:string){
     this.orderService.deleteOrders(id).then(()=>{
      this.toast.success('Delete success');
       this.loadOrder();
     }).catch(err =>{
       this.toast.error(err)
     })
  }

}
