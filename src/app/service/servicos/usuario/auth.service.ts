// src/app/service/servicos/usuario/auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
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

  deleteUser(id: number): Observable<any> {
    const url = `/usuarios/delete/${id}/`;
    const headers = this.getAuthHeaders();
    return this.http.delete(this.apiUrl + url, { headers, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
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
}
