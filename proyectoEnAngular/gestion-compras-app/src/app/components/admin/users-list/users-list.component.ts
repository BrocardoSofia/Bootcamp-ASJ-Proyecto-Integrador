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
  
  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
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
}
