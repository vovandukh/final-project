import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public basket:any = [];
  public total = 0;
  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.loadBasket();
    this.setTotalPrice();
  }
  loadBasket(){
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }else{
      this.basket =[];
    }
  }
  setTotalPrice() {
    if (this.basket.length === 0) {
      this.total = 0;
    } else {
      this.total = this.basket.reduce((total:any, order: any) => total + order.product.price * order.product.count, 0)
    }
  }
  changeCount(status:boolean,item:any){

    console.log(item);
    if(status){
      item.count++ ;
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.setTotalPrice();
      this.orderService.checkBasket.next(true)
    } else{
      if(item.count > 1){ 
        item.count-- ;
        localStorage.setItem('basket', JSON.stringify(this.basket));
        this.setTotalPrice();
        this.orderService.checkBasket.next(true)
      }
    }
  }
  removeProduct(id:string){
   if(this.basket.length == 1){
     localStorage.removeItem('basket')
     this.loadBasket();
     this.setTotalPrice();
     this.orderService.checkBasket.next(true)
   } else{
    let index = this.basket.findIndex((elem:any) =>{
      if(elem.id == id){
        return elem
      }
     })
     this.basket.splice(index,1);
     localStorage.setItem('basket', JSON.stringify(this.basket));
     this.loadBasket();
     this.setTotalPrice();
     this.orderService.checkBasket.next(true)
   }
  }
}
