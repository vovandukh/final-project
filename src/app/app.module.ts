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
import { CatalogComponent } from './pages/catalog/catalog.component';
import { AdminSubCategoryComponent } from './admin/admin-sub-category/admin-sub-category.component';
import { SliderComponent } from './pages/home/slider/slider.component';
import { ButtonComponent } from './components/button/button.component';
import { HomeCategoryComponent } from './pages/home/home-category/home-category.component';
import { VideoSliderComponent } from './pages/home/video-slider/video-slider.component';
import { HomeNewsComponent } from './pages/home/home-news/home-news.component';
import { ReviewSliderComponent } from './components/review-slider/review-slider.component';
import { BrandsComponent } from './components/brands/brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideFirebaseApp, initializeApp }
  from '@angular/fire/app';
import { getAuth, provideAuth }
  from '@angular/fire/auth';
import { getFirestore, provideFirestore }
  from '@angular/fire/firestore';
import { getStorage, provideStorage }
  from '@angular/fire/storage';
import { getAnalytics, provideAnalytics }
  from '@angular/fire/analytics';
import { environment } from 'src/environments/environment';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ShopVossenComponent } from './pages/home/shop-vossen/shop-vossen.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminSubModelComponent } from './admin/admin-sub-model/admin-sub-model.component';


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
    CatalogComponent,
    AdminSubCategoryComponent,
    SliderComponent,
    ButtonComponent,
    HomeCategoryComponent,
    VideoSliderComponent,
    HomeNewsComponent,
    ReviewSliderComponent,
    BrandsComponent,
    ShopVossenComponent,
    CheckoutComponent,
    AdminSubModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideAnalytics(() => getAnalytics()),
    NgxSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
