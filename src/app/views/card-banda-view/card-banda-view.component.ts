import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-banda-view',
  templateUrl: './card-banda-view.component.html',
  styleUrls: ['./card-banda-view.component.scss']
})
export class CardBandaViewComponent implements OnInit {
  nomeBanda: string = '';
  avaliacaoMedia: number = 0;
  resumoBanda: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nomeBanda = params['nomeBanda'] || '';
      this.avaliacaoMedia = +params['avaliacaoMedia'] || 0;
      this.resumoBanda = params['resumoBanda'] || '';
    });
  }
}
