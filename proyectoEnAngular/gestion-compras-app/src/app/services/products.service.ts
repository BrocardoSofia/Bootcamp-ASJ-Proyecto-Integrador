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

    return products.filter((product)=>product.deleted === false);
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

 /*
 Retorna el ultimo id, si no hay productos retorna 0
 */
 public getLastCode(){
  const products:Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    let lastId = 0;
    
    if(products.length !== 0){
      lastId = products[products.length-1].id;
    }

    return lastId;
 }

 /*
  esta funcion elimina un producto a traves de su id
  
  return boolean
  si lo elimina devuelve true
  si no lo encuentra devuelve false
  */
  public deleteProduct(id: number){
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');

    let deleted = false;
    let i=0;

    while(deleted===false && i<products.length){
      if(products[i].id === id){
        products[i].deleted = true;
        console.log("eliminado");
        deleted = true;
      }
      i++;
    }

    //actualizo el localStorage
    window.localStorage.setItem('products', JSON.stringify(products));

    return deleted;
  }
 
}
