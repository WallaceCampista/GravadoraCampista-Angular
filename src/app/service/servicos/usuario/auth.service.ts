// src/app/service/servicos/usuario/auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.restaurarSessao();
  }

  login(username: string, password: string): Observable<any> {
    let url: string = '/usuarios/post/login/';
    return this.http.post<any>(this.apiUrl + url, { username, password });
  }

  register(user: any): Observable<any> {
    let url: string = '/usuarios/post/registro/';
    return this.http.post(this.apiUrl + url, user, { responseType: 'text' });
  }

  deleteUser(id: number): Observable<any> {
    const url = `/usuarios/delete/${id}/`;
    return this.http.delete(this.apiUrl + url, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: { username?: string; password?: string; email?: string; primeiroNome?: string; sobrenome?: string; isAdmin?: boolean }): Observable<string> {
    const url = `/usuarios/update/${id}/`;
    return this.http.put(this.apiUrl + url, user, { responseType: 'text' });
  }

  getAllUsers(): Observable<any> {
    let url: string = '/usuarios/all';
    return this.http.get<any>(this.apiUrl + url);
  }

  // Guarda o nome junto com o token para a saudação sobreviver ao F5
  iniciarSessao(response: { token: string; primeiroNome: string; isAdmin: boolean }): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('nomeUser', response.primeiroNome);
    this.userService.nomeUser = response.primeiroNome;
    this.userService.isAdmin = response.isAdmin;
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('nomeUser');
    }
    this.userService.nomeUser = '';
    this.userService.isAdmin = false;
  }

  getToken(): string | null {
    return typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && this.isTokenValid(token);
  }

  // Lido do próprio token, que é o que o backend confere nas rotas de admin
  isAdminLogado(): boolean {
    const token = this.getToken();
    if (!token || !this.isTokenValid(token)) {
      return false;
    }
    return jwtDecode<{ isAdmin?: boolean }>(token).isAdmin === true;
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
    return throwError(errorMessage);
  }

  isTokenValid(token: string): boolean {
    try {
      const { exp } = jwtDecode(token);
      return exp !== undefined && exp > Date.now() / 1000;
    } catch (e) {
      return false;
    }
  }

  private restaurarSessao(): void {
    if (this.isLoggedIn()) {
      this.userService.nomeUser = localStorage.getItem('nomeUser') ?? '';
      this.userService.isAdmin = this.isAdminLogado();
    }
  }
}
