import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NavBarService } from '../../../services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  private admin: boolean = false;

  constructor(private router: Router,
              private nabBarService: NavBarService ) { }

  ngOnInit(): void {
    this.nabBarService.admin$.subscribe(admin => {
      this.admin = admin;
      // Do something with the updated value of admin
    });
  }
  
  show(){
    return this.admin;
  }
  
  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }

  selectedPath(buttonPath: string):boolean{
    return buttonPath === this.router.url;
  }
}
