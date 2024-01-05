import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../models/suppliers';
import { SuppliersService } from '../../../services/suppliers.service';
import Swal from 'sweetalert2';

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
    this.suppliers = this.suppliersService.getActiveSuppliers();
  }

  getID(id:string, i:number){
    return (id+i);
  }

  setToDeleteSupplier(supplier: Supplier){
    this.toDeleteSupplier = supplier;
    
  }

  deleteSupplier(){
    //elimino al proveedor
    this.suppliersService.deleteSupplierByCode(this.toDeleteSupplier.code);

    //recargo los suppliers
    this.updateSuppliers();
    
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Se elimino correctamente el proveedor: " + this.toDeleteSupplier.businessName,
    });
  }
}
