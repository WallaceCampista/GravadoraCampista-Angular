// src/app/service/servicos/usuario/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) {}

  login(username: string, password: string): Observable<any> {
    let url: string = '/usuarios/post/login/';
    return this.http.post<any>(this.apiUrl + url, { username, password });
  }

  register(user: any): Observable<any> {
    let url: string = '/usuarios/post/registro/';
    return this.http.post(this.apiUrl + url, user);
  }

  getAuthHeaders(): HttpHeaders {
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      console.error('Token not found in localStorage');
    }
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAllUsers(): Observable<any> {
    let url: string = '/usuarios/all';
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl + url, { headers });
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}
