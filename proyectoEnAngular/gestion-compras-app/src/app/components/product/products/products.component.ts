import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];
  toDeleteProduct:Product = this.productsService.inicProduct();

  constructor(private productsService: ProductsService){}

  ngOnInit() {
    this.products = this.productsService.getProducts();
    
  }

  setToDeleteProduct(product: Product){
    this.toDeleteProduct = product;
    
  }

  deleteProduct(){
    //elimino el producto
    this.productsService.deleteProduct(this.toDeleteProduct.id);

    //recargo los productos
    this.updateProducts();
    
  }

  private updateProducts(){
    //actualiza a los productos
    this.products = this.productsService.getProducts();
  }

}
