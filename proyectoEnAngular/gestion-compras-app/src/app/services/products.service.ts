import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { SuppliersService } from './suppliers.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private suppliersService: SuppliersService) {
  }

  public inicProduct(){
    const product:Product = {
      id: -1,
      code: '',
      supplier: this.suppliersService.inicSupplier(),
      img: '',
      category: '',
      name: '',
      description: '',
      price: -1,
      deleted: false
    }

    return product;
  }

  /*
  Agrega un producto al LocalStorage
  */
  public addProduct(product: Product){
    let products:Product[] = JSON.parse(localStorage.getItem('products') || '[]');

    products.push(product);

    //guardo el arreglo en el localStorage
    window.localStorage.setItem('products', JSON.stringify(products));
  }

  /*
  Retorna todos los productos actualizados con sus respectivos proveedores
  */
  public getProducts(){
    let products:Product[] = JSON.parse(localStorage.getItem('products') || '[]');

    //actualizo todos los productos con su proveedor
    for(let product of products){
      const supplier = this.suppliersService.getSupplier(product.supplier.code);
      if(supplier != null){
        product.supplier = supplier;
      }
    }

    return products;
  }

  /*
  Informa si existe el codigo/SKU

  return boolean
  si existe true
  si no existe false
  */
 public existCode(code: string){
    const products:Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    let exist = false;
    let i = 0;

    while(i < products.length && exist === false){
      if(products[i].code === code){
        exist = true;
      }
      i++;
    }

    return exist;
 }

}
