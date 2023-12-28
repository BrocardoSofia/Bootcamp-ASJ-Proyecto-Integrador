import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../models/suppliers';
import { SuppliersService } from '../../services/suppliers.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit{
  suppliers: Supplier[] = [];
  toDeleteSupplier:Supplier = this.suppliersService.inicSupplier();

  constructor(private suppliersService: SuppliersService){}

  ngOnInit() {
    this.updateSuppliers();
  }

  private updateSuppliers(){
    //actualiza a los proveedores
    this.suppliers = this.suppliersService.getSuppliers();
  }

  getID(id:string, i:number){
    return (id+i);
  }

  setToDeleteSupplier(supplier: Supplier){
    this.toDeleteSupplier = supplier;
    
  }

  deleteSupplier(){
    //elimino al proveedor
    this.suppliersService.deleteSupplier(this.toDeleteSupplier.code);

    //recargo los suppliers
    this.updateSuppliers();
    
  }
}
