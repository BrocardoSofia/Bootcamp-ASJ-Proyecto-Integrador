import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';
import { ProductCategory } from '../../../models/product-category';
import { SupplierCategory } from '../../../models/supplier-category';
import { SupplierCategoriesService } from '../../../services/supplier-categories.service';

type State = 'All' | 'Active' | 'Deleted';
type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products:Product[] = [];
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchProductName: string = '';
  searchProductNameOn: boolean = false;
  searchProductDescription: string = '';
  searchProductDescriptionOn: boolean = false;

  searchProductCategory: number = 0;

  state: State = 'Active';
  selectedOption: string = '2';

  businessNameSort:SortOrder = 'None';

  supplierCategories: SupplierCategory[] = [];
  productCategories: ProductCategory[] = [];

  constructor(private productsService: ProductsService,
              private supplierCategoriesService: SupplierCategoriesService){}

  ngOnInit() {
    //obtengo los rubros
    this.supplierCategoriesService.getSupplierCategories().subscribe(
      response=>{
        let supplierCategoriesResponse: SupplierCategory[] = response;
        //filtro solo los rubros que tengan categorias de productos
        this.supplierCategories = supplierCategoriesResponse.filter(category=> category.products.length !== 0);
      }
    )
    
    //obtengo los primeros productos activos
  }

  

}
