import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

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

  public validPassword(user_name: string, password: string): Observable<boolean>{
    let valid = false;
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    let found = users.find((user) => user.userAlias === user_name);

    if (found && found.password === password) {
      valid = true;
    }

    return of(valid);
  }


}
