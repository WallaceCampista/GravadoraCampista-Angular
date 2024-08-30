import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-banda',
  templateUrl: './card-banda.component.html',
  styleUrl: './card-banda.component.scss'
})
export class CardBandaComponent implements OnInit {
  nomeBanda = "Charlie Brown Jr.";
  avaliacaoBanda = 10;
  resumoBanda = "Charlie Brown Jr. foi uma banda brasileira de rock formada em 1992 na cidade de Santos, por Chorão, Champignon, Marcão Britto, Thiago Castanho e Renato Pelado. Sua discografia contabiliza 13 álbuns de estúdio lançados, 4 álbuns ao vivo e 7 DVDs";
  isPageBanda = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isPageBanda = this.router.url === '/pagebanda';
  }
}
