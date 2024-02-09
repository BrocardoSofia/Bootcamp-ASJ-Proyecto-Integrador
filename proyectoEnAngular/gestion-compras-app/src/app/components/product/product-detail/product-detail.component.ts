import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  product!: Product;
  idParam: number = 0;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params) => {
      let param = params.get('product') || null;

      if (param !== null) {
        this.idParam = parseInt(param);

        this.productsService.getProductById(this.idParam).subscribe(response => {

          if(response !== null){
            this.product = response;
            
          }else{
            //lo redirijo a la pagina anterior
            this.router.navigate(['/products']);
          }
          
        });
      }
    });
  }
}
