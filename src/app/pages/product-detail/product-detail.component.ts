import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IModelresponce } from 'src/app/shared/interfaces/model/model.interface';
import { ISubModelResponce } from 'src/app/shared/interfaces/sub-model/sub-model.inteface';
import { ModelService } from 'src/app/shared/services/model/model.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { SubModelService } from 'src/app/shared/services/sub-model/sub-model.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product:any;
  public orderDetail!:FormGroup;
  public modelCar:ISubModelResponce[] = []
  public modelBrand:IModelresponce[] = []
  public productID = this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private activatedRoute: ActivatedRoute,private peroductService:ProductService,private fb:FormBuilder,private modelService:ModelService,private orderService:OrderService,private subModelService:SubModelService) { }

  ngOnInit(): void {
    this.getProduct(this.productID);
    this.initOrderDetail();
    this.loadModel();
  }

  initOrderDetail(){
    this.orderDetail = this.fb.group({
      year:[null,Validators.required],
      brand:[null,Validators.required],
      model:[null,Validators.required],
      size:[null,Validators.required],
      product:null,
      id:null
    })
  }

  loadModel(){
    this.modelService.loadModelFB().subscribe(data =>{
      this.modelBrand = data;
    })
  }

  loadSubModel(event:any){
    let name = event.target.value;
    this.subModelService.loadSubModelByBrand(name).then(data =>{
      this.modelCar = []
      data.forEach(elem =>{
       this.modelCar.push(elem.data() as ISubModelResponce)
      }) 
    })
    
  }
 
  getProduct(id:any){
    this.peroductService.getProductById(id).then(data =>{
      this.product = data.data();
      console.log(this.product);
    })
  }
  addToBasket(){    
   this.orderDetail.patchValue({
      product:this.product,
      id:this.productID
    })
    let basket = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      basket.push(this.orderDetail.value);  
    }else{
      basket.push(this.orderDetail.value);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.product.count = 1;
    this.orderService.checkBasket.next(true);
  }
  
  

  changeCount(status:boolean){
    if(status){
      this.product.count++
    } else{
      if(this.product.count > 1){
        this.product.count--
      }
    }
  }
}
