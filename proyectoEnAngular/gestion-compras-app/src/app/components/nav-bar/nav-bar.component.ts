import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{
  constructor(private router: Router ) { }
  
  selectedPath(buttonPath: string):boolean{
    return buttonPath === this.router.url;
  }
}
