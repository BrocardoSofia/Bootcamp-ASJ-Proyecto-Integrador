import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: boolean = false;

  constructor() { }

  public inicUser(){
    let user: User = {
      userName: '',
      password: '',
      dateInfo: {
        createdAt: null,
        updatedAt: null,
        deletedAt: null
      }
    }

    return user;
  }

  public getLoggedStatus(){
    return this.loggedIn;
  }


}
