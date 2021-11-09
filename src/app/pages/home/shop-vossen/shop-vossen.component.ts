import { Component, OnInit } from '@angular/core';
import { IProductResponce } from 'src/app/shared/interfaces/products/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-shop-vossen',
  templateUrl: './shop-vossen.component.html',
  styleUrls: ['./shop-vossen.component.scss']
})
export class ShopVossenComponent implements OnInit {
  public button1 = {type:'button',text:'shop vossen',color:'#e43315'}
 public button2 = {type:'button',text:'more brands',color:'rgb(30,30,30)'}
  public products:IProductResponce[] = []

  constructor(private productServise:ProductService) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(){
    const brand='vossen';
    this.productServise.getProductByBrand(brand).then(data =>{
      data.forEach(elem =>{
        let product = {id:elem.id,...elem.data() }
        this.products.push(product as IProductResponce); 
      })
    })
  }

}
