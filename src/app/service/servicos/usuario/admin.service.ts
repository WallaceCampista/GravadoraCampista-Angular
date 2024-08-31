// src/app/service/admin.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();

  setAdminStatus(isAdmin: boolean): void {
    this.isAdminSubject.next(isAdmin);
  }
}
