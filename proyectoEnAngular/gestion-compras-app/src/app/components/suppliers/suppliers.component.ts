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

  constructor(private suppliersService: SuppliersService){}

  ngOnInit() {
    this.updateSuppliers();
  }

  private updateSuppliers(){
    //actualiza a los proveedores
    this.suppliers = this.suppliersService.getSuppliers();
  }

  deleteSupplier(code: string, businessName: string){
    //pregunto si esta seguro de que quiere eliminar al proveedor
    let confirmDelete = confirm("Esta seguro que desea eliminar al proovedor "+businessName);

    if(confirmDelete){
      //elimino al proveedor
      this.suppliersService.deleteSupplier(code);

      //recargo los suppliers
      this.updateSuppliers();
    }
    
  }
}
