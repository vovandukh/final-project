import { Component, OnInit } from '@angular/core';
import { IOrderRequvest } from 'src/app/shared/interfaces/order/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  public orders:IOrderRequvest[] = []

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(){
   this.orderService.loadOrder().subscribe(data =>{
     this.orders = data;
     console.log(this.orders);
   })
  }

}
