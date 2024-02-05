import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';
import Swal from 'sweetalert2';

type State = 'All' | 'Active' | 'Deleted';
type SortOrder = 'None' | 'asc' | 'desc';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{

  users:User[] = [];
  currentPage: number = 0;
  pages:number = 1;
  maxPages: number = 5;
  nextFive: boolean = false;
  previous: boolean = false;
  searchUserName: string = '';
  searchUserNameOn: boolean = false;
  state: State = 'All';
  selectedOption: string = '1';
  userAliasSort:SortOrder = 'None';
  createdAtSort:SortOrder = 'None';
  
  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data=>{
      this.pages = data.totalPages;
      this.users = data.content;

      if(this.pages > 5){
        this.nextFive = true;
      }
    })
  }

  getUserState(user: User){
    return (user.deletedAt !== null)?'Inactivo':'Activo';
  }

  deleteUser(user: User){
    Swal.fire({
      title: "Eliminando al usuario: " + user.userAlias,
      text: "¿Esta seguro que desea eliminar al usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Eliminado!",
              text: "El usuario " + deleted.userAlias + " fue eliminado correctamente",
              icon: "success"
            });
            this.selectPage(this.currentPage);
          }
        )
        
      }
    });
  }

  reInsertUser(user: User){
    Swal.fire({
      title: "Reingresando al usuario: " + user.userAlias,
      text: "¿Esta seguro que desea reingresar al usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reingresar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.reInsertUser(user).subscribe(
          deleted=>{
            Swal.fire({
              title: "¡Re ingresado!",
              text: "El usuario " + deleted.userAlias + " fue re ingresado correctamente",
              icon: "success"
            });
            this.selectPage(this.currentPage);
          }
        )
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
    this.currentPage = page;
      switch(this.state){
        case 'All':
          ///VER ESTE SORT PARA EL RESTO
          this.userService.getAllUsers(page,this.getSort(),this.searchUserName).subscribe(
            data=>{
              this.users = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Active':
          this.userService.getAllActiveUsers(page,this.getSort(),this.searchUserName).subscribe(
            data=>{
              this.users = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
        case 'Deleted':
          this.userService.getAllDeletedUsers(page,this.getSort(),this.searchUserName).subscribe(
            data=>{
              this.users = data.content;
              this.pages = data.totalPages;
            }
            );
          break;
     }  
  }

  changeStatusFilter(){
    switch(this.selectedOption){
      case '1':
        this.state = 'All';
        break;
      case '2':
        this.state = 'Active';
        break;
      case '3':
        this.state = 'Deleted';
        break;
    }
    this.selectPage(this.currentPage);
  }

  nextPage(){
    this.currentPage++;
    this.selectPage(this.currentPage);
  }

  prevPage(){
    this.currentPage--;
    this.selectPage(this.currentPage);
  }

  searchByUserName(){
    this.searchUserNameOn = true;
    this.selectPage(this.currentPage);
  }

  clearSearchByName(){
    this.searchUserName = '';
    this.searchUserNameOn = false;
    this.selectPage(this.currentPage);
  }

  changeSort(columnName: string){
    switch(columnName){
      case 'userAlias':
        if(this.userAliasSort === 'None'){
          this.userAliasSort = 'desc';
        }else if(this.userAliasSort === 'desc'){
          this.userAliasSort = 'asc';
        }else{
          this.userAliasSort = 'None';
        }
        break;
      case 'createdAt':
        if(this.createdAtSort === 'None'){
          this.createdAtSort = 'desc';
        }else if(this.createdAtSort === 'desc'){
          this.createdAtSort = 'asc';
        }else{
          this.createdAtSort = 'None';
        }
        break;
    }
    this.selectPage(0);
  }

  getSort(){
    let sort:string = '';

    if(this.userAliasSort !== 'None'){
      sort = '&sort=userAlias,'+this.userAliasSort;
    }

    if(this.createdAtSort !== 'None'){
      sort += '&sort=createdAt,'+this.createdAtSort;
    }

    return sort;
  }
}
