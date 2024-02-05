import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router'
import { NavBarService } from '../../../services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  private admin: boolean = false;
  breadcrumb: String[] = [];
  path!: String;

  constructor(private router: Router,
              private nabBarService: NavBarService ) { }

  ngOnInit(): void {
    this.nabBarService.admin$.subscribe(admin => {
      this.admin = JSON.parse(this.nabBarService.getAdmin()||'false');
      // Do something with the updated value of admin
    });
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Actualiza el breadcrumb
        this.updateBreadcrumb();
        this.path = '';
      }
    });
  }

  getPath(path: String){
    let currentPath:string = '';

    if(this.path !== ''){
      currentPath = '/'+this.path.valueOf();
    }

    currentPath = currentPath +'/'+path.valueOf();
    
    return currentPath;
  }

  updateBreadcrumb() {
    // Recorre las rutas hijas para construir el breadcrumb
    this.breadcrumb = this.router.url.split("/");
    // Actualiza el breadcrumb en tu componente navBar
    // ...
    this.breadcrumb.splice(0, 1);
    console.log(this.breadcrumb);
  }

  getName(routeName: String){
    let name = routeName.split('?')[0];

    switch(name){
      case 'suppliers': 
        name = 'Proveedores';
        break;
      case 'new': 
        name = 'Nuevo';
        break;
      case 'detail': 
        name = 'Detalle';
        break;
      case 'edit': 
        name = 'Edición';
        break;
      case 'products': 
        name = 'Productos';
        break;
      case 'purchase-orders': 
        name = 'Ordenes de Compra';
        break;
      case 'home': 
        name = 'Home';
        break;
      case 'users': 
        name = 'Usuarios';
        break;
      case 'supplier-categories': 
        name = 'Rubros';
        break;
      case 'product-categories': 
        name = 'Categorias';
        break;
    }

    return name;
  }

  getPaths(){
    console.log("rutas: "+this.router.url.slice());
  }
  
  show(){
    return this.admin;
  }
  
  logout(){
    localStorage.removeItem("token");
    this.nabBarService.setAdmin(false);
    this.router.navigate(['/']);
  }

  selectedPath(buttonPath: string):boolean{
    return buttonPath === this.router.url;
  }
}
