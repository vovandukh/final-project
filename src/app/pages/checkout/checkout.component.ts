import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Firestore,setDoc,doc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public basket: any = [];
  public total = 0;
  public orderForm!: FormGroup;
  constructor(private fb: FormBuilder, private orderService: OrderService, private router: Router,private toast:ToastrService,private firestore:Firestore) { }

  ngOnInit(): void {
    this.loadBasket();
    this.setTotalPrice();
    this.initOrder();
    this.loadUser();
  }

  initOrder() {
    this.orderForm = this.fb.group({
      name: [null,Validators.required],
      streetAddress: [null,Validators.required],
      city: [null,Validators.required],
      country: [null,Validators.required],
      phone: [null,Validators.required],
      email: [null,Validators.email],
      payment: [null,Validators.required],
      basket: null,
      total: null,
      status: 'pending'
    })
  }

  loadUser() {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') as string)
      if (user.role === 'USER') {
        this.orderForm.patchValue({
          name: user.name,
          streetAddress: user.address,
          city: user.city,
          country: user.country,
          phone: user.phoneNumber,
          email: user.email,
        })
      }

    }
  }

  loadBasket() {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string)
    } else {
      this.basket = [];
    }
    console.log(this.basket);

  }

  createOrder() {
    this.orderForm.patchValue({
      basket: this.basket,
      total: this.total,
    })
    this.orderService.createOrder(this.orderForm.value).then((data) => {
      if (localStorage.length > 0 && localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user') as string)
        user.orders.push(data.id)
        setDoc(doc(this.firestore,'users',user.uid),user)
        localStorage.setItem('user', JSON.stringify(user))
      }
      localStorage.removeItem('basket');
      this.router.navigate(['']);
      this.orderService.checkBasket.next(true);
      this.toast.success('success order')
    })
  }


changePayment(payment: any){
  this.orderForm.patchValue({
    payment: payment
  })
}

setTotalPrice() {
  if (this.basket.length === 0) {
    this.total = 0;
  } else {
    this.total = this.basket.reduce((total: any, order: any) => total + order.product.price * order.product.count, 0)
  }
}



}
