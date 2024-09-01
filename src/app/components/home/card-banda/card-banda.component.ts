import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-banda',
  templateUrl: './card-banda.component.html',
  styleUrls: ['./card-banda.component.scss']
})
export class CardBandaComponent implements OnInit {
  @Input() nomeBanda: string = "";
  @Input() avaliacaoMedia: number = 0;
  @Input() resumoBanda: string = "";
  isPageBanda = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isPageBanda = this.router.url.startsWith('/pagebanda');
  }

  getResumoLimitado(): string {
    return this.resumoBanda.length > 190 ? this.resumoBanda.substring(0, 190) + '...' : this.resumoBanda;
  }

  navigateToPageBanda(): void {
    this.router.navigate(['/pagebanda'], {
      queryParams: {
        nomeBanda: this.nomeBanda,
        avaliacaoMedia: this.avaliacaoMedia,
        resumoBanda: this.resumoBanda
      }
    });
  }
}
