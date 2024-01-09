import { NgModule } from '@angular/core';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
