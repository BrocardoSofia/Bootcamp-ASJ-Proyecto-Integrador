import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Proveedores',
        routerLink: ['/suppliers'],
        icon: 'pi pi-users'
      },
      {
        label: 'Productos',
        routerLink: ['/products'],
        icon: 'pi pi-box'
      },
      {
        label: 'Ordenes de Compra',
        routerLink: ['/purchase-orders'],
        icon: 'pi pi-book'
      }
    ]
  }
}
