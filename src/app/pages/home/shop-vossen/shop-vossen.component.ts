import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-shop-vossen',
  templateUrl: './shop-vossen.component.html',
  styleUrls: ['./shop-vossen.component.scss']
})
export class ShopVossenComponent implements OnInit, OnDestroy {
  public products: IProductResponce[] = []
  public productsSubscription!: Subscription;
  constructor(private productServise: ProductService) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.productsSubscription = this.productServise.loadproductFB().subscribe(data => {
      data.forEach((elem: IProductResponce) => {
        if (elem.brand == 'vossen') {
          this.products.push(elem)
        }
      });
    })
  }
  ngOnDestroy() {
    this.productsSubscription.unsubscribe()

  }
}
