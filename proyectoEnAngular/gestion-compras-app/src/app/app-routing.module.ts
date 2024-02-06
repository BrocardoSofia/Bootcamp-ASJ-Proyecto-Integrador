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
import { UsersListComponent } from './components/admin/users/users-list/users-list.component';
import { NewUserComponent } from './components/admin/users/new-user/new-user.component';
import { loginGuard } from './guards/login.guard';
import { UserDetailComponent } from './components/admin/users/user-detail/user-detail.component';
import { ConfigSupplierCategoriesComponent } from './components/admin/supplier-categories/config-supplier-categories/config-supplier-categories.component';
import { NewSupplierCategoriesComponent } from './components/admin/supplier-categories/new-supplier-categories/new-supplier-categories.component';
import { ProductCategoriesListComponent } from './components/admin/product-categories/product-categories-list/product-categories-list.component';
import { NewProductCategoriesComponent } from './components/admin/product-categories/new-product-categories/new-product-categories.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index'},
  { path: 'index', component: LoginComponent },
  { path: 'users',
    children: [
      { path: '', component: UsersListComponent, canActivate : [loginGuard]},
      { path: 'new', component: NewUserComponent, canActivate : [loginGuard]},
      { path: 'edit', component: NewUserComponent, canActivate : [loginGuard]},
      { path: 'detail', component: UserDetailComponent, canActivate : [loginGuard]}
    ],
  },
  { path: 'product-categories', 
    children: [
      { path: '', component: ProductCategoriesListComponent, canActivate : [loginGuard]},
      { path: 'new', component: NewProductCategoriesComponent, canActivate : [loginGuard]},
      { path: 'edit', component: NewProductCategoriesComponent, canActivate : [loginGuard]} 
    ]
  },
  { path: 'supplier-categories',
    children: [
      { path: '', component: ConfigSupplierCategoriesComponent, canActivate : [loginGuard]},
      { path: 'new', component: NewSupplierCategoriesComponent, canActivate : [loginGuard]},
      { path: 'edit', component: NewSupplierCategoriesComponent, canActivate : [loginGuard]}    ],
  },
  { path: 'home', component: WelcomeComponent, canActivate : [loginGuard]},
  { path: 'suppliers',
    children: [
      { path: '', component: SuppliersComponent, canActivate : [loginGuard]},
      { path: 'new', component: SuppliersCreateComponent, canActivate : [loginGuard]},
      { path: 'edit', component: SuppliersCreateComponent, canActivate : [loginGuard]},
      { path: 'detail', component: SupplierDetailComponent, canActivate : [loginGuard]},
    ],
  },
  { path: 'products',
    children: [
      { path: '', component: ProductsComponent, canActivate : [loginGuard]},
      { path: 'new', component: ProductsCreateComponent, canActivate : [loginGuard]},
      { path: 'edit', component: ProductsCreateComponent, canActivate : [loginGuard]},
      { path: 'detail', component: ProductDetailComponent, canActivate : [loginGuard]},
    ],
  },
  { path: 'purchase-orders', 
    children: [
      { path: '', component: PurchaseOrdersComponent, canActivate : [loginGuard]},
      { path: 'new', component: PurchaseOrdersCreateComponent, canActivate : [loginGuard]},
      { path: 'detail', component: PurchaseOrderDetailComponent, canActivate : [loginGuard]},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
