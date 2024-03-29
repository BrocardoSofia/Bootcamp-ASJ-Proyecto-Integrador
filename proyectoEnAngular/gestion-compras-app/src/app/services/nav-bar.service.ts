import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
  private adminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public admin$: Observable<boolean> = this.adminSubject.asObservable();

  constructor() { }

  public setAdmin(value: boolean): void {
    localStorage.setItem('admin',JSON.stringify(value));
    this.adminSubject.next(value);
  }

  public getAdmin(){
    return localStorage.getItem('admin');
  }
}
