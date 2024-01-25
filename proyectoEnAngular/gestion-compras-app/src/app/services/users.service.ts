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
      id: 1,
      userName: '',
      password: '',
      createdAt: new Date,
      deletedAt: null
    }

    return user;
  }

  public addUser(user: User): Observable<User> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    if(users.length !== 0){
      user.id = users[users.length-1].id + 1;
    }
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

  public getUserById(id: number): Observable<User|undefined> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    let userById = users.find((user)=>user.id === id);
  
    return of(userById);
  }

  public modifyUser(user: User):Observable<boolean>{
    const users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');

    //busco el proveedor y lo modifico en el arreglo
    let modified = false;
    let i=0;

    while(modified===false && i<users.length){
      if(users[i].id === user.id){
        users[i] = user;
        modified = true;
      }
      i++;
    }

    //guardo el arreglo en el localStorage
    window.localStorage.setItem('users', JSON.stringify(users));

    return of(modified);
  }

  
}
