import { Component } from '@angular/core';

@Component({
  selector: 'app-new-supplier-categories',
  templateUrl: './new-supplier-categories.component.html',
  styleUrl: './new-supplier-categories.component.css'
})
export class NewSupplierCategoriesComponent {
  edit: boolean = false;
  supplierCategory: string = '';
}
