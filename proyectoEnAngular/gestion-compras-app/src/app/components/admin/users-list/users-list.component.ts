import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{

  users:User[] = [];
  
  constructor(private userService: UsersService){}
  ngOnInit(): void {
    this.userService.userExists('user');
  }
}
