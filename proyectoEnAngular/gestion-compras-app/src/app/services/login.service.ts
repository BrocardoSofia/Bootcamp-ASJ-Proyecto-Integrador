import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: boolean = false;

  constructor() { }

  public getLoggedStatus(){
    return this.loggedIn;
  }

  public validAdmin(password: string){
    let valid: boolean = false;

    if(password === 'admin'){
      valid = true;
    }

    return valid;
  }

  public validUser(){

  }


}
