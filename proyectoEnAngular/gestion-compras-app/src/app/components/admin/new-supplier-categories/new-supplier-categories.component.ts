import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-supplier-categories',
  templateUrl: './new-supplier-categories.component.html',
  styleUrl: './new-supplier-categories.component.css'
})
export class NewSupplierCategoriesComponent implements OnInit{
  edit: boolean = false;
  supplierCategory: string = '';
  submitForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private activeRoute: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      category: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  submitCategory(){
    
  }
}
