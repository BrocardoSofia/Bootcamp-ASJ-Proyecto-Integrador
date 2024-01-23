import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliersComponent } from './components/supplier/suppliers/suppliers.component';
import { ProductsComponent } from './components/product/products/products.component';
import { PurchaseOrdersComponent } from './components/purchase-order/purchase-orders/purchase-orders.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SuppliersCreateComponent } from './components/supplier/suppliers-create/suppliers-create.component';
import { ProductsCreateComponent } from './components/product/products-create/products-create.component';
import { PurchaseOrdersCreateComponent } from './components/purchase-order/purchase-orders-create/purchase-orders-create.component';
import { SupplierDetailComponent } from './components/supplier/supplier-detail/supplier-detail.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { PurchaseOrderDetailComponent } from './components/purchase-order/purchase-order-detail/purchase-order-detail.component';
import { LoginComponent } from './components/login/login.component';
import { UsersListComponent } from './components/admin/users-list/users-list.component';
import { NewUserComponent } from './components/admin/new-user/new-user.component';
import { loginGuard } from './guards/login.guard';
import { ConfigCategoiresComponent } from './components/admin/config-categoires/config-categoires.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index'},
  { path: 'index', component: LoginComponent },
  { path: 'users', component: UsersListComponent, canActivate : [loginGuard]},
  { path: 'new-user', component: NewUserComponent, canActivate : [loginGuard]},
  { path: 'config-categories', component: ConfigCategoiresComponent, canActivate : [loginGuard]},
  { path: 'home', component: WelcomeComponent, canActivate : [loginGuard]},
  { path: 'suppliers',
    children: [
      { path: '', component: SuppliersComponent, canActivate : [loginGuard]},
      { path: 'create', component: SuppliersCreateComponent, canActivate : [loginGuard]},
      { path: 'modify', component: SuppliersCreateComponent, canActivate : [loginGuard]},
      { path: 'detail', component: SupplierDetailComponent, canActivate : [loginGuard]},
    ],
  },
  { path: 'products',
    children: [
      { path: '', component: ProductsComponent, canActivate : [loginGuard]},
      { path: 'create', component: ProductsCreateComponent, canActivate : [loginGuard]},
      { path: 'modify', component: ProductsCreateComponent, canActivate : [loginGuard]},
      { path: 'detail', component: ProductDetailComponent, canActivate : [loginGuard]},
    ],
  },
  { path: 'purchase-orders', 
    children: [
      { path: '', component: PurchaseOrdersComponent, canActivate : [loginGuard]},
      { path: 'create', component: PurchaseOrdersCreateComponent, canActivate : [loginGuard]},
      { path: 'detail', component: PurchaseOrderDetailComponent, canActivate : [loginGuard]},
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
