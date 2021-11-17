import { Component, OnInit } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { getDoc } from '@firebase/firestore';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.scss']
})
export class ProfileOrdersComponent implements OnInit {
  public basket: any = [];
  public orders: any = [];
  public page: number = 1;
  public totalLength!: number;

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    if (localStorage.length > 0 && localStorage.getItem('users')) {
      const user = JSON.parse(localStorage.getItem('users') as string)
      if (user.role === 'USER') {
        this.orders = [];
        user.orders.forEach((elem: any) => {
          getDoc(doc(this.firestore, 'orders', elem)).then(data => {
            let orders = { id: data.id, ...data.data() }
            this.orders.push(orders)
          })
        });
        this.orders.forEach((elem: any) => {
          this.basket.push(elem.basket);
        });
        this.totalLength = this.orders.length;
      }
    }
  }

}
