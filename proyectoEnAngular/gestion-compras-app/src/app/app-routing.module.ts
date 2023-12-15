import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path:'', component: WelcomeComponent},
  {path:'suppliers', component: SuppliersComponent},
  {path:'products', component: ProductsComponent},
  {path:'purchase-orders', component:PurchaseOrdersComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
