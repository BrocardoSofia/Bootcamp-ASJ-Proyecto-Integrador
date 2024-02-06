import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../../../models/product-category';
import { ProductCategoriesService } from '../../../../services/product-categories.service';

type State = 'All' | 'Active' | 'Deleted';
type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-product-categories-list',
  templateUrl: './product-categories-list.component.html',
  styleUrl: './product-categories-list.component.css'
})
export class ProductCategoriesListComponent implements OnInit{

  suplierCategories:ProductCategory[] = [];
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

  constructor(private productCategoryService: ProductCategoriesService){}

  ngOnInit(): void {
    this.productCategoryService.getProductCategories().subscribe(data=>{
      this.pages = data.totalPages;
      this.suplierCategories = data.content;

      if(this.pages > 5){
        this.nextFive = true;
      }
    })
  }
}
