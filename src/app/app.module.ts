import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminModelComponent } from './admin/admin-model/admin-model.component';
import { AdminSubModelComponent } from './admin/admin-sub-model/admin-sub-model.component';
import { CategoryComponent } from './pages/catalog/category/category.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { SubCategoryComponent } from './pages/catalog/category/sub-category/sub-category.component';
import { AdminSubCategoryComponent } from './admin/admin-sub-category/admin-sub-category.component';
import { SliderComponent } from './pages/home/slider/slider.component';
import { ButtonComponent } from './components/button/button.component';
import { HomeCategoryComponent } from './pages/home/home-category/home-category.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { VideoSliderComponent } from './pages/home/video-slider/video-slider.component';
import { HomeNewsComponent } from './pages/home/home-news/home-news.component';
import { ReviewSliderComponent } from './components/review-slider/review-slider.component';
import { BrandsComponent } from './components/brands/brands.component';
// import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductDetailComponent,
    BasketComponent,
    AdminCategoryComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProfileComponent,
    AdminModelComponent,
    AdminSubModelComponent,
    CategoryComponent,
    CatalogComponent,
    SubCategoryComponent,
    AdminSubCategoryComponent,
    SliderComponent,
    ButtonComponent,
    HomeCategoryComponent,
    SubscribeComponent,
    ProductCardComponent,
    VideoSliderComponent,
    HomeNewsComponent,
    ReviewSliderComponent,
    BrandsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
