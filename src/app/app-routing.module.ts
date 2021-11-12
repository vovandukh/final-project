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
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginUserComponent } from './pages/login-user/login-user.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { NewsComponent } from './pages/news/news.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { ProfileInfoComponent } from './pages/profile/profile-info/profile-info.component';
import { ProfileOrdersComponent } from './pages/profile/profile-orders/profile-orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './shared/guards/Auth/auth.guard';
import { CheckoutGuard } from './shared/guards/checkout/checkout.guard';
import { ProfileGuard } from './shared/guards/profile/profile.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'catalog/:name', component: CatalogComponent },
  { path: 'products-detail/:id', component: ProductDetailComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-user', component: LoginUserComponent },
  {
    path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'profile-info' },
      { path: 'profile-info', component: ProfileInfoComponent },
      { path: 'profile-orders', component: ProfileOrdersComponent },
      { path: 'edit-profile', component: EditProfileComponent },
    ]
  },
  { path: 'news', component: NewsComponent },
  { path: 'news-detail/:id', component: NewsDetailComponent },
  { path: 'checkout', component: CheckoutComponent,canActivate:[CheckoutGuard] },
  { path: 'contacts', component: ContactsComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      { path: '', pathMatch: 'full', redirectTo: 'admin-category' },
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
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
