// src/app/components/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true;

  constructor(private router: Router, private authService: AuthService) {}

  //função ocultar navbar no modulo de login e cadastro
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showNavbar = this.router.url !== '/login' && this.router.url !== '/cadastro';
    });
  }

  //função para focar o link clicado na navbar
  setFocus(event: Event) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('focused'));
    (event.target as HTMLElement).classList.add('focused');
  }

  //função para buscar todos os usuários
  fetchAllUsers(event: Event) {
    event.preventDefault(); // Prevenir o comportamento padrão do link
    this.authService.getAllUsers().subscribe({
      next: response => {
        console.log('Usuários:', response);
      },
      error: error => {
        console.error('Erro ao buscar usuários:', error);
      }
    });
  }
}
