import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable , Observer, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private pages: number = 0;
  private usersPerPage: number = 10;
  private url: string = 'http://localhost:8080/users';
  
  constructor(private http: HttpClient) { }

  public inicUser(){
    let user: User = {
      id: 0,
      userAlias: '',
      password: '',
      createdAt: new Date,
      updatedAt: null,
      deletedAt: null
    }

    return user;
  }

  public addUser(user: User): Observable<User> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<User>(this.url, user, { headers });
  }

  public updateUser(user: User): Observable<User> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<User>(this.url, user, { headers });
  }

  public userExists(userName: string): Observable<boolean> {
    let exist = false;
    const url = this.url + "/exist/" + userName;

    return this.http.get<boolean>(url);
  }

  public deleteUser(user: User): Observable<User> {
    const url = this.url + "/" + user.id;

    return this.http.delete<User>(url);
  }

  public reInsertUser(user: User): Observable<User> {
    const url = this.url + "/" + user.id + "/reInsert";

    return this.http.delete<User>(url);
  }

  getUsers(): Observable<any> {
    const params = {
      page: '0',
      size: '10'
    };

    return this.http.get(this.url, { params });
  }

  //get all users filtered
  getAllUsers(pageNumber:number, orderBy: string, userAliasFront: string): Observable<any> {
    const params = {
      page: pageNumber,
      size: '10',
      sort: orderBy,
      userAlias: userAliasFront
    };

    return this.http.get(this.url, { params });
  }

  //get active users filtered
  getAllActiveUsers(pageNumber:number, orderBy: string, userAliasFront: string): Observable<any> {
    const params = {
      page: pageNumber,
      size: '10',
      sort: orderBy,
      userAlias: userAliasFront
    };

    return this.http.get(this.url+"/active", { params });
  }

  //get deketed users filtered
  getAllDeletedUsers(pageNumber:number, orderBy: string, userAliasFront: string): Observable<any> {
    const params = {
      page: pageNumber,
      size: '10',
      sort: orderBy,
      userAlias: userAliasFront
    };

    return this.http.get(this.url+"/deleted", { params });
  }

  getUserById(id: number): Observable<User>{
    const url = this.url+'/'+id;

    return new Observable<User>(observer => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const user: User = data;
          observer.next(user);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }
  
}
