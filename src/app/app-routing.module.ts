import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminModelComponent } from './admin/admin-model/admin-model.component';
import { AdminNewsComponent } from './admin/admin-news/admin-news.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminSubCategoryComponent } from './admin/admin-sub-category/admin-sub-category.component';
import { AdminSubModelComponent } from './admin/admin-sub-model/admin-sub-model.component';
import { AdminComponent } from './admin/admin.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { NewsComponent } from './pages/news/news.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './shared/guards/Auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'catalog/:name', component: CatalogComponent},
  { path: 'products-detail/:id', component: ProductDetailComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news-detail/:id', component:NewsDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],children: [
      { path: '', pathMatch: 'full', redirectTo: 'admin-category'},
      { path: 'admin-category', component: AdminCategoryComponent },
      { path: 'admin-sub-category', component: AdminSubCategoryComponent },
      { path: 'admin-products', component: AdminProductsComponent },
      { path: 'admin-model', component: AdminModelComponent },
      { path: 'admin-sub-model', component: AdminSubModelComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
      { path: 'admin-news', component: AdminNewsComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
