import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public basket:any = [];
  public total = 0;
  public orderForm!:FormGroup;
  constructor(private fb:FormBuilder,private orderService:OrderService, private router:Router) { }

  ngOnInit(): void {
    this.loadBasket();
    this.setTotalPrice();
    this.initOrder();
  }

  initOrder(){
    this.orderForm = this.fb.group({
      firstName:null,
      lastName:null,
      streetAddress:null,
      city:null,
      country:null,
      phone:null,
      email:null,
      payment:null,
      basket:null,
      total:null
    })
  }

  loadBasket(){
    if(localStorage.length > 0 && localStorage.getItem('basket')){
    this.basket = JSON.parse(localStorage.getItem('basket') as string)
    } else{
      this.basket = [];
    }
    console.log(this.basket);
    
  }

  createOrder(){
    this.orderForm.patchValue({
      basket:this.basket,
      total:this.total
    })
    this.orderService.createOrder(this.orderForm.value).then(()=>{
      localStorage.removeItem('basket');
      this.router.navigate(['']);
      this.orderService.checkBasket.next(true);
      alert('success order')
    })
   
    
  }
  changePayment(payment:any){
    this.orderForm.patchValue({
      payment:payment
    })
  }

  setTotalPrice() {
    if (this.basket.length === 0) {
      this.total = 0;
    } else {
      this.total = this.basket.reduce((total:any, order: any) => total + order.product.price * order.product.count, 0)
    }
  }



}
