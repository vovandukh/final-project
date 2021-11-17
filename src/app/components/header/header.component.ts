import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { LoginService } from 'src/app/shared/services/login/login.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  @ViewChild('topPanel') topPanel!: ElementRef;
  public userLogin = false;
  public topPanelOffsetTop: number = 0;
  public topPanelElse = { 'top-panel-else': false };
  public menuOpen = { 'display': 'none' };
  public basketModal = { 'display': 'none' };
  public basketproduscts: boolean = false;
  public total = 0;
  public basket = [];
  public basketInfo: IProductResponce[] = [];
  public buttonUp = { 'display': 'none' };
  public SubscriptionBasket!:Subscription;
  public SubscriptionLogin!:Subscription;



  constructor(private orderService: OrderService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.checkChenge();
    this.loadBasket();
    this.setTotalPrice();
    this.loginCheck();
    this.checkUserLogin()
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
    if (this.topPanelOffsetTop > 80) {
      this.buttonUp = { 'display': 'block' }
    } else {
      this.buttonUp = { 'display': 'none' }
    }
  }
  loadBasket() {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      this.basketInfo = [];
      this.basketproduscts = true;
      this.basket.forEach((elem: any) => {
        this.basketInfo.push((elem.product as any))
      })
    } else {
      this.basket = [];
      this.basketproduscts = false;
    }

  }
  checkChenge() {
    this.SubscriptionBasket = this.orderService.checkBasket.subscribe(() => {
      this.loadBasket();
      this.setTotalPrice();
    })
  }

  checkUserLogin():void {
    if (localStorage.length > 0 && localStorage.getItem('users')) {
      const user = JSON.parse(localStorage.getItem('users') as string)
      if (user.role === 'USER') {
         this.userLogin = true;
      } else {
        this.userLogin = false;
      }
    } else {
      this.userLogin = false
    }
  }

  loginCheck() {
    this.SubscriptionLogin = this.loginService.$checkLogin.subscribe(() => {
      this.checkUserLogin()
    })
  }
  setTotalPrice() {
    if (this.basket.length === 0) {
      this.total = 0;
    } else {
      this.total = this.basket.reduce((total, order: any) => total + order.product.price * order.product.count, 0)
    }
  }
  removeProduct(id: string) {
    if (this.basket.length == 1) {
      localStorage.removeItem('basket')
      this.loadBasket();
      this.setTotalPrice();
      this.orderService.checkBasket.next(true)
    } else {
      let index = this.basket.findIndex((elem: any) => {
        if (elem.id == id) {
          return elem
        }
      })
      this.basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.loadBasket();
      this.setTotalPrice();
      this.orderService.checkBasket.next(true)
    }
  }


  openBasketModal(status:any) {
   if(status){
    this.basketModal = { 'display': 'block' }
   }else{
    this.basketModal = { 'display': 'none' }
   }
  }

  openMenu(status: any) {
    if (status) {
      this.menuOpen = { 'display': 'block' };
    } else {
      this.menuOpen = { 'display': 'none' };
    }
  }
  backToUp() {
    window.scrollTo(0, 0)
  }
  ngOnDestroy(){
   this.SubscriptionLogin.unsubscribe()
   this.SubscriptionBasket.unsubscribe()
  }
}
