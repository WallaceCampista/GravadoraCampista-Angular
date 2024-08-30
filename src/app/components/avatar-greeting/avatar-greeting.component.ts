import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-avatar-greeting',
  templateUrl: './avatar-greeting.component.html',
  styleUrls: ['./avatar-greeting.component.scss']
})
export class AvatarGreetingComponent implements OnInit {
  nomeUser: string = 'Wallace';
  showAvatarGreeting: boolean = true;
  showLabel: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showAvatarGreeting = event.url !== '/login' && event.url !== '/cadastro';
      }
    });
  }

  toggleLabel(): void {
    this.showLabel = !this.showLabel;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.greeting')) {
      this.showLabel = false;
    }
  }
}
