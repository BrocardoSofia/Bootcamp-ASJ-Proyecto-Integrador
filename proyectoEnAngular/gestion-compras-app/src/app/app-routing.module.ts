import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ProductsComponent } from './components/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-orders/purchase-orders.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SuppliersCreateComponent } from './components/suppliers-create/suppliers-create.component';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { PurchaseOrdersCreateComponent } from './components/purchase-orders-create/purchase-orders-create.component';
import { SupplierDetailComponent } from './components/supplier-detail/supplier-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PurchaseOrderDetailComponent } from './components/purchase-order-detail/purchase-order-detail.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'suppliers',
    children: [
      { path: '', component: SuppliersComponent },
      { path: 'create', component: SuppliersCreateComponent },
      { path: 'modify', component: SuppliersCreateComponent },
      { path: 'detail', component: SupplierDetailComponent },
    ],
  },
  { path: 'products',
    children: [
      { path: '', component: ProductsComponent },
      { path: 'create', component: ProductsCreateComponent },
      { path: 'modify', component: ProductsCreateComponent },
      { path: 'detail', component: ProductDetailComponent },
    ],
  },
  { path: 'purchase-orders', 
    children: [
      { path: '', component: PurchaseOrdersComponent },
      { path: 'create', component: PurchaseOrdersCreateComponent },
      { path: 'detail', component: PurchaseOrderDetailComponent },
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
