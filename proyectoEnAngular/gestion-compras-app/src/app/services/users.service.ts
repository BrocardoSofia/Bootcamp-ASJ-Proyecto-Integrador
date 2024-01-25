import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable , Observer, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private pages: number = 0;
  private usersPerPage: number = 10;
  constructor() { }

  public inicUser(){
    let user: User = {
      id: 1,
      userName: '',
      password: '',
      createdAt: new Date,
      updatedAt: null,
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

  public getAmountPages(): Observable<number>{
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    return of(Math.ceil((users.length/this.usersPerPage)));
  }

  public getFirstUsers(): Observable<User[]> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
  
    return of(users.slice(0, this.usersPerPage));
  }

  public getPageUsers(page: number): Observable<User[]> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    let searchPage = (page-1) * this.usersPerPage;
    
    return of(users.slice(searchPage, searchPage+this.usersPerPage));
  }

  public getActiveUsers(): Observable<User[]> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    return of(users.filter((user)=>user.deletedAt === null));
  }

  public getDeletedUsers(): Observable<User[]> {
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    return of(users.filter((user)=>user.deletedAt !== null));
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
        users[i].updatedAt = new Date();
        modified = true;
      }
      i++;
    }

    //guardo el arreglo en el localStorage
    window.localStorage.setItem('users', JSON.stringify(users));

    return of(modified);
  }

  public deleteUser(user: User):Observable<User[]>{
    const users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');

    //busco el proveedor y lo modifico en el arreglo
    let deleted = false;
    let i=0;

    while(deleted===false && i<users.length){
      if(users[i].id === user.id){
        users[i].deletedAt = new Date();
        users[i].updatedAt = new Date();
        deleted = true;
      }
      i++;
    }

    //guardo el arreglo en el localStorage
    window.localStorage.setItem('users', JSON.stringify(users));

    return of(users);
  }

  public reInsertUser(user: User):Observable<User[]>{
    const users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');

    //busco el proveedor y lo modifico en el arreglo
    let deleted = false;
    let i=0;

    while(deleted===false && i<users.length){
      if(users[i].id === user.id){
        users[i].deletedAt = null;
        users[i].updatedAt = new Date();
        deleted = true;
      }
      i++;
    }

    //guardo el arreglo en el localStorage
    window.localStorage.setItem('users', JSON.stringify(users));

    return of(users);
  }

  getUsersByUserName(userName: string):Observable<User[]>{
    const users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    return of(users.filter((user)=>user.userName.match(userName)));
  }

  getAmountPagesByUserName(userName: string):Observable<number>{
    let users: User[] = JSON.parse(window.localStorage.getItem('users') || '[]');
    const usersFilter = users.filter((user)=>user.userName.match(userName));

    return of(Math.ceil((usersFilter.length/this.usersPerPage)));
  }
  
}
