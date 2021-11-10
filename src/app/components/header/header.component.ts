import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('topPanel') topPanel!: ElementRef;
  public topPanelOffsetTop: number = 0;
  public topPanelElse = { 'top-panel-else': false };
  public adminLogin = false;
  public menuOpen = { 'display': 'none' };
  public basketModal = { 'display': 'none' };
  public basketproduscts:boolean = false;
  public total = 0;
  public basket = [];
  public basketInfo:IProductResponce[] = [];
  constructor(private orderService: OrderService

  ) { }

  ngOnInit(): void {
    this.checkChenge();
    this.loadBasket();
    this.setTotalPrice()
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const rect = this.topPanel.nativeElement.getBoundingClientRect();
    this.topPanelOffsetTop = +rect.top + window.pageYOffset - document.documentElement.clientTop;
    if (this.topPanelOffsetTop > 10) {
      this.topPanelElse = { 'top-panel-else': true }
    } else {
      this.topPanelElse = { 'top-panel-else': false }
    }
  }
  loadBasket() {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.basketInfo = [];
      this.basketproduscts = true;
      this.basket.forEach((elem:any) =>{
        this.basketInfo.push((elem.product as any))
      })
    } else {
      this.basket = [];
      this.basketproduscts = false;
    }

  }
  checkChenge() {
    this.orderService.checkBasket.subscribe(() => {
      this.loadBasket();
      this.setTotalPrice();
    })
  }

  setTotalPrice() {
    if (this.basket.length === 0) {
      this.total = 0;
    } else {
      this.total = this.basket.reduce((total, order: any) => total + order.product.price * order.product.count, 0)
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


  openBasketModal() {
    this.basketModal = { 'display': 'block' }
  }
  closeBasketModal() {
    this.basketModal = { 'display': 'none' }
  }

  openMenu(status:any) {
    if(status){
      this.menuOpen = { 'display': 'block' };
    } else{
      this.menuOpen = { 'display': 'none' };
    }
  }
}
