import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/servicos/usuario/auth.service';

// Sem token: o backend recusa qualquer token inválido, até no login
const ROTAS_PUBLICAS = ['/usuarios/post/login/', '/usuarios/post/registro/'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(environment.apiUrl) || ROTAS_PUBLICAS.some(rota => req.url.endsWith(rota))) {
      return next.handle(req);
    }

    const token = this.authService.getToken();
    if (token && this.authService.isTokenValid(token)) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // 403: sem token, token vencido ou usuário excluído. O 401 (não é admin) não derruba a sessão.
        if (error.status === 403) {
          this.authService.logout();
          this.router.navigate(['/login'], { queryParams: { sessaoExpirada: true } });
        }
        return throwError(() => error);
      })
    );
  }
}
