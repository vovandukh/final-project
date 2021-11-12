import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from '@firebase/firestore';
import { IOrderRequvest, IOrderResponce } from 'src/app/shared/interfaces/order/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  public orders: IOrderResponce[] = []

  constructor(private orderService: OrderService,private firestore:Firestore) { }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.loadOrder().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
    })
  }

  changeStatus(event: any, item:IOrderResponce) {
    let value = event.target.value;
    this.orders.forEach(elem => {
      if (elem.id === item.id) {
        elem.status = value
      }
    })
    setDoc(doc(this.firestore , 'orders',item.id),item)
  }

}
