import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../models/suppliers';
import { SuppliersService } from '../../../services/suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { auto } from '@popperjs/core';

@Component({
  selector: 'app-suppliers-create',
  templateUrl: './suppliers-create.component.html',
  styleUrl: './suppliers-create.component.css',
})
export class SuppliersCreateComponent implements OnInit {
  supplierCodeValid:boolean = false;
  taxDadaValid:boolean = false;
  logoValid:boolean = false;
  locationValid:boolean = false;
  businessInfoValid:boolean = false;

  supplier!: Supplier;
  edit: boolean = false;
  idParam: number = 0;
  oldBusinessName!: string;
  oldSupplierCode!: string;

  codeForm!: FormGroup;
  taxDataForm!: FormGroup;
  logoForm!: FormGroup;
  locationForm!: FormGroup;
  submitForm!: FormGroup;

  constructor(
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.supplier = this.suppliersService.inicSupplier();

    this.codeForm = this.fb.group({
      businessName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      supplierCode: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
  }

  submitSupplierCodeAndBusinessName(){
    //verifico que la razon social sea valida

    //verifico que el codigo de proveedor sea valido
  }

  
}
