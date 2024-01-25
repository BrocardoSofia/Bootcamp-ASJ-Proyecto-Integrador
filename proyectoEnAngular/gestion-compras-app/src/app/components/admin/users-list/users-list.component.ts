import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{

  users:User[] = [];
  currentPage: number = 1;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  
  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.userService.getFirstUsers().subscribe(users => {
      this.users = users;

      this.userService.getAmountPages().subscribe((data)=>{
        this.pages = data;
        if(this.pages > 5){
          this.nextFive = true;
        }
      })
    });
  }

  getEstado(user: User){
    return (user.deletedAt !== null)?'Inactivo':'Activo';
  }

  deleteUser(user: User){
    Swal.fire({
      title: "Eliminando al usuario: " + user.userName,
      text: "¿Esta seguro que desea eliminar al usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((data)=>{
          this.users = data;
          Swal.fire({
            title: "¡Eliminado!",
            text: "¡El usuario " + user.userName + " fue eliminado correctamente!",
            icon: "success"
          });
        })  
      }
    });
  }

  reInsertUser(user: User){
    Swal.fire({
      title: "Reingresando al usuario: " + user.userName,
      text: "¿Esta seguro que desea reingresar al usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reingresar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.reInsertUser(user).subscribe((data)=>{
          this.users = data;
          Swal.fire({
            title: "¡Reingresado al sistema!",
            text: "¡El usuario " + user.userName + " fue reingresado correctamente!",
            icon: "success"
          });
        })  
      }
    });
  }

  getPages(): number[] {
    this.pages;
    let startPage = Math.max(1, this.currentPage - Math.floor(this.maxPages / 2));
    let endPage = Math.min(this.pages, startPage + this.maxPages - 1);
  
    if(this.pages > 5){
      if(endPage-startPage != 4){
        startPage = endPage-4;
      }
    }
    let returnPages = Array.from(Array(Math.min(5, endPage - startPage + 1)), (_, i) => startPage + i);
  
    return returnPages;
  }

  selectPage(page: number){
    this.userService.getPageUsers(page).subscribe((data)=>{
      this.users = data;
    })
    this.currentPage = page;
    
  }
}
