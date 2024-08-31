import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _nomeUser: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  set nomeUser(value: string) {
    this._nomeUser.next(value);
  }

  get nomeUser$() {
    return this._nomeUser.asObservable();
  }

  set isAdmin(value: boolean) {
    this._isAdmin.next(value);
  }

  get isAdmin$() {
    return this._isAdmin.asObservable();
  }
}
