import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { TableModule } from 'primeng/table';
import { SuppliersCreateComponent } from './components/suppliers-create/suppliers-create.component';

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
    SuppliersCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    MenubarModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
