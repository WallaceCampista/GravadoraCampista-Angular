import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/servicos/usuario/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    // Havia token, mas venceu: avisa na tela de login
    const sessaoExpirada = this.authService.getToken() !== null;
    this.authService.logout();
    return this.router.createUrlTree(['/login'], sessaoExpirada ? { queryParams: { sessaoExpirada: true } } : {});
  }
}
