import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable , Observer, of } from 'rxjs';

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

  public addUser(user: User): Observable<User> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    users.push(user);
    window.localStorage.setItem('users', JSON.stringify(users));
    return Observable.create((observer: Observer<User>) => {
      observer.next(user);
      observer.complete();
    });
  }

  public userExists(userName: string): Observable<boolean> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    let found = users.find((user) => user.userName === userName);
    return Observable.create((observer: Observer<boolean>) => {
      observer.next(!!found);
      observer.complete();
    });
  }

  public getUsers(): Observable<User[]> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    return of(users);
  }

  public validPassword(user_name: string, password: string): Observable<boolean>{
    let valid = false;
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    let found = users.find((user) => user.userName === user_name);

    if (found && found.password === password) {
      valid = true;
    }

    return of(valid);
  }
}
