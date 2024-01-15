import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public inicUser(){
    let user: User = {
      userName: '',
      password: '',
      deleted: false
    }

    return user;
  }

  public addUser(user: User){
    let users:User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    
    users.push(user);

    window.localStorage.setItem('users', JSON.stringify(users));
  }

  public userExists(userName: string){
    let exist = false;

    let users:User[] = JSON.parse(window.localStorage.getItem('users') || '[]');

    let found = users.find((user)=>user.userName === userName);

    if(!found){
      exist = true;
    }

    return exist;
  }
}
