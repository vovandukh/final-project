import { Component, OnInit } from '@angular/core';
import { Firestore, setDoc, doc } from '@angular/fire/firestore';
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
  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private toast: ToastrService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.setTotalPrice();
    this.initOrder();
    this.loadUser();
  }

  initOrder() {
    this.orderForm = this.fb.group({
      name: [null, Validators.required],
      streetAddress: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      phone: [null, Validators.pattern('[0-9]{10}')],
      email: [null, Validators.email],
      payment: [null, Validators.required],
      basket: null,
      total: null,
      status: 'pending'
    })
  }


  loadUser() {
    if (localStorage.length > 0 && localStorage.getItem('users')) {
      const user = JSON.parse(localStorage.getItem('users') as string)
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
  }

  createOrder() {
    let status = false;
    this.orderForm.patchValue({
      basket: this.basket,
      total: this.total,
    })
    for (const key in this.orderForm.value) {
      if (!this.orderForm.controls[key].value || this.orderForm.controls[key].errors) {
        this.toast.error('Invalid', key);
        document.getElementById(key)?.classList.add('invalid');
        status = false;
        break
      } else {
        document.getElementById(key)?.classList.remove('invalid');
        status = true;
      }
    }
    if (status) {
      this.orderService.createOrder(this.orderForm.value).then((data) => {
        if (localStorage.length > 0 && localStorage.getItem('users')) {
          const user = JSON.parse(localStorage.getItem('users') as string);
          user.orders.push(data.id);
          setDoc(doc(this.firestore, 'users', user.id), user);
          localStorage.setItem('users', JSON.stringify(user));
        }
        localStorage.removeItem('basket');
        this.router.navigate(['']);
        this.orderService.checkBasket.next(true);
        this.toast.success('Success order');

      })
    }
  }


  changePayment(payment: any) {
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
