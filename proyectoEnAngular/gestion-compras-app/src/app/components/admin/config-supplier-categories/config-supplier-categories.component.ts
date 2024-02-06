import { Component } from '@angular/core';
import { SupplierCategory } from '../../../models/supplier-category';
import { SupplierCategoriesService } from '../../../services/supplier-categories.service';

type State = 'All' | 'Active' | 'Deleted';
type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-config-supplier-categories',
  templateUrl: './config-supplier-categories.component.html',
  styleUrl: './config-supplier-categories.component.css'
})
export class ConfigSupplierCategoriesComponent {

  suplierCategories:SupplierCategory[] = [];
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchCategory: string = '';
  searchCategoryOn: boolean = false;
  state: State = 'All';
  selectedOption: string = '1';
  categorySort:SortOrder = 'None';
  createdAtSort:SortOrder = 'None';

  constructor(private supplierCategoryService: SupplierCategoriesService){}

  ngOnInit(): void {
    this.supplierCategoryService.getSupplierCategories().subscribe(data=>{
      this.pages = data.totalPages;
      this.suplierCategories = data.content;

      if(this.pages > 5){
        this.nextFive = true;
      }
    })
  }
}
