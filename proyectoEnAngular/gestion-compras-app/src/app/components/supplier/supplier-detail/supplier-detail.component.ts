import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../../models/suppliers';
import { SuppliersService } from '../../../services/suppliers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrl: './supplier-detail.component.css'
})
export class SupplierDetailComponent implements OnInit{
  supplier!: Supplier;
  idParam: number = 0;
  products:Product[] = [];

  constructor(
    private suppliersService: SuppliersService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      let param = params.get('supplier') || null;

      if (param !== null) {
        this.idParam = parseInt(param);

        this.suppliersService.getSupplierById(this.idParam).subscribe(response => {

          if(response !== null){
            this.supplier = response;
            
          }else{
            //lo redirijo a la pagina anterior
            this.router.navigate(['/suppliers']);
          }

          this.productsService.getAllProductsBySupplierId(this.supplier.id).subscribe(
            response=>{
              this.products = response;
            }
          )
          
        });
      }
    });
  }

  changeImage(event: Event): void {
    const imagen = event.target as HTMLImageElement;
    imagen.src = '/assets/imageNotFound.jpg';
  }
}
