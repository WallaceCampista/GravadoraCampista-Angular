import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';
import { AdminService } from 'src/app/service/servicos/usuario/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showNavbar: boolean = true;
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showNavbar = this.router.url !== '/login' && this.router.url !== '/cadastro';
    });

    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  setFocus(event: Event) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.classList.remove('focused'));
    (event.target as HTMLElement).classList.add('focused');
  }

  fetchAllUsers(event: Event) {
    event.preventDefault();
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
