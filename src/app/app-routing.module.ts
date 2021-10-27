import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminModelComponent } from './admin/admin-model/admin-model.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminSubModelComponent } from './admin/admin-sub-model/admin-sub-model.component';
import { AdminComponent } from './admin/admin.component';
import { BasketComponent } from './pages/basket/basket.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { CategoryComponent } from './pages/catalog/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'catalog', component: CatalogComponent, children: [
      { path: 'catalog-category', component: CategoryComponent }
    ]
  },
  { path: 'products', component: ProductsComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: 'admin-category', component: AdminCategoryComponent },
      { path: 'admin-products', component: AdminProductsComponent },
      { path: 'admin-model', component: AdminModelComponent },
      { path: 'admin-sub-model', component: AdminSubModelComponent },
      { path: 'admin-orders', component: AdminOrdersComponent },
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
