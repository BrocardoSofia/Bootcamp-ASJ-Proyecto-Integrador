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
    this.suppliers = this.suppliersService.getSuppliers();
  }
}
