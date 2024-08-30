import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    let url : string = '/usuarios/post/login/';
    return this.http.post<any>(this.apiUrl + url, { username, password });
  }

  register(user: any): Observable<any> {
    let url : string = '/usuarios/post/registro/';
    return this.http.post(this.apiUrl + url, user);
  }


  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllUsers(): Observable<any> {
    let url : string = '/usuarios/all';
    const headers = this.getAuthHeaders();
    return this.http.get<any>(this.apiUrl + url, { headers });
  }
}
