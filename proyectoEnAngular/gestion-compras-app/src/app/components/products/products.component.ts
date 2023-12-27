import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];

  constructor(private productsService: ProductsService){}

  ngOnInit() {
    this.products = this.productsService.getProducts();
    
  }

  deleteProduct(id:number, name:string){
    //pregunto si esta seguro de que quiere eliminar el producto
    let confirmDelete = confirm("Esta seguro que desea eliminar al producto "+name);

    if(confirmDelete){
      //elimino el producto
      this.productsService.deleteProduct(id);

      //recargo los productos
      this.updateProducts();
    }
  }

  private updateProducts(){
    //actualiza a los productos
    this.products = this.productsService.getProducts();
  }

}
