import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SuppliersCreateComponent } from './components/suppliers-create/suppliers-create.component';
import { ProductsCreateComponent } from './components/products-create/products-create.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'suppliers',
    children: [
      { path: '', component: SuppliersComponent },
      { path: 'create', component: SuppliersCreateComponent },
      { path: 'modify', component: SuppliersCreateComponent },
    ],
  },
  { path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: 'create', component: ProductsCreateComponent },
      { path: 'modify', component: ProductsCreateComponent },
    ],
  },
  { path: 'purchase-orders', component: PurchaseOrdersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
