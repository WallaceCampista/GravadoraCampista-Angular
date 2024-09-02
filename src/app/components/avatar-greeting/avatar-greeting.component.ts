import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from 'src/app/service/servicos/usuario/user.service';
import { AdminService } from 'src/app/service/servicos/usuario/admin.service';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';

@Component({
  selector: 'app-avatar-greeting',
  templateUrl: './avatar-greeting.component.html',
  styleUrls: ['./avatar-greeting.component.scss']
})
export class AvatarGreetingComponent implements OnInit {
  nomeUser: string = '';
  isAdmin: boolean = false;
  showAvatarGreeting: boolean = true;
  showLabel: boolean = false;

  constructor(private router: Router, private userService: UserService, private adminService: AdminService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.nomeUser$.subscribe(nome => {
      this.nomeUser = nome;
    });

    this.userService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      this.adminService.setAdminStatus(isAdmin);
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showAvatarGreeting = event.urlAfterRedirects !== '/login' && event.urlAfterRedirects !== '/cadastro';
      }
    });
  }

  toggleLabel(): void {
    this.showLabel = !this.showLabel;
  }

  logout(): void {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.greeting')) {
      this.showLabel = false;
    }
  }
}
