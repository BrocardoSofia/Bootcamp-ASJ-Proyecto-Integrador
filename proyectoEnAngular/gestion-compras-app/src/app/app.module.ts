import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import{ FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/shared/nav-bar/nav-bar.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SuppliersComponent } from './components/supplier/suppliers/suppliers.component';
import { ProductsComponent } from './components/product/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-order/purchase-orders/purchase-orders.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SuppliersCreateComponent } from './components/supplier/suppliers-create/suppliers-create.component';
import { ProductsCreateComponent } from './components/product/products-create/products-create.component';
import { PurchaseOrdersCreateComponent } from './components/purchase-order/purchase-orders-create/purchase-orders-create.component';
import { PurchaseOrderDetailComponent } from './components/purchase-order/purchase-order-detail/purchase-order-detail.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { SupplierDetailComponent } from './components/supplier/supplier-detail/supplier-detail.component';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/admin/users/users-list/users-list.component';
import { NewUserComponent } from './components/admin/users/new-user/new-user.component';
import { UserDetailComponent } from './components/admin/users/user-detail/user-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigSupplierCategoriesComponent } from './components/admin/supplier-categories/config-supplier-categories/config-supplier-categories.component';
import { NewSupplierCategoriesComponent } from './components/admin/supplier-categories/new-supplier-categories/new-supplier-categories.component';
import { NewProductCategoriesComponent } from './components/admin/product-categories/new-product-categories/new-product-categories.component';
import { ProductCategoriesListComponent } from './components/admin/product-categories/product-categories-list/product-categories-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent,
    FooterComponent,
    SuppliersComponent,
    ProductsComponent,
    PurchaseOrdersComponent,
    WelcomeComponent,
    SuppliersCreateComponent,
    ProductsCreateComponent,
    PurchaseOrdersCreateComponent,
    PurchaseOrderDetailComponent,
    ProductDetailComponent,
    SupplierDetailComponent,
    LoginComponent,
    UsersListComponent,
    NewUserComponent,
    UserDetailComponent,
    ConfigSupplierCategoriesComponent,
    NewSupplierCategoriesComponent,
    NewProductCategoriesComponent,
    ProductCategoriesListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
