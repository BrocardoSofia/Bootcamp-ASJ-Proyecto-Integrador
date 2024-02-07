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
  

  constructor(
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    
  }

  
}
