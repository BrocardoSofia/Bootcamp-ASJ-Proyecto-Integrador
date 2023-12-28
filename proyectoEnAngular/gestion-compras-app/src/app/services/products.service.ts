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
    const products:Product[] = JSON.parse(localStorage.getItem('products') || '[]');

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
  Retorna el producto que coincida con el numero
  */
  public getProductByCode(code: string){
    const products:Product[] = JSON.parse(localStorage.getItem('products') || '[]');
    let product = null;
    let i = 0;

    //busco el producto con ese id
    while(product === null && i<products.length){
      if(products[i].code === code){
        product = products[i];
      }
      i++;
    }

    return product;
  }

  /*
  esta funcion reinserta un producto a traves de su codigo
  
  return boolean
  si lo reinserta devuelve true
  si no lo encuentra devuelve false
  */
  public reInsertProduct(product:Product){
    let products:Product[] = JSON.parse(localStorage.getItem('products') || '[]');

    let reInsert = false;
    let i=0;

    while(reInsert===false && i<products.length){
      if(products[i].id === product.id){
        products[i] = product;
        products[i].deleted = false;
        reInsert = true;
      }
      i++;
    }

    //actualizo el localStorage
    window.localStorage.setItem('products', JSON.stringify(products));

    return reInsert;
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
 public getLastId(){
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

  /*
  Modifica el producto
  */
  public modifyProduct(product: Product){
    const products: Product[] = JSON.parse(localStorage.getItem('products') || '[]');

    //busco el proveedor y lo modifico en el arreglo
    let modified = false;
    let i=0;

    while(modified===false && i<products.length){
      if(products[i].id === product.id){
        products[i] = product;
        modified = true;
      }
      i++;
    }

    //guardo el arreglo en el localStorage
    window.localStorage.setItem('products', JSON.stringify(products));

    return modified;
  }
 
}
