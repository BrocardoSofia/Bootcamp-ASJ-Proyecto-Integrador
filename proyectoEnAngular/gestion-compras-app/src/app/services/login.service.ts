import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavBarService } from './nav-bar.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedIn: boolean = false;
  private url: string = 'http://localhost:8080/users';
  private userId:number = -1;

  constructor(private http: HttpClient,
              private navBarService: NavBarService) { }

  public getLoggedStatus(){
    return this.loggedIn;
  }

  private isAdmin(userAlias: string){
    return userAlias === 'admin_asjcompras_01';
  }

  public getUserId(){
    return this.userId;
  }

  public validLogin(userAlias: string, password: string): Observable<User>{

    return this.http.get<User>(this.url+"/login/"+userAlias+"/"+password).pipe(
      map(user => {
        if (user !== null) {
          this.userId = user.id;
          localStorage.setItem('token', ''+user.id); // Guardar token para guards
        }

        if (this.isAdmin(userAlias)) {
          this.navBarService.setAdmin(true);
        }

        return user;
      })
    );
   
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
