import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BandaService } from 'src/app/service/servicos/formularios/banda.service';

@Component({
  selector: 'app-card-banda-view',
  templateUrl: './card-banda-view.component.html',
  styleUrls: ['./card-banda-view.component.scss']
})
export class CardBandaViewComponent implements OnInit {
  nomeBanda: string = '';
  avaliacaoMedia: number = 0;
  resumoBanda: string = '';
  albuns: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private bandaService: BandaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.nomeBanda = params['nomeBanda'] || '';
      this.avaliacaoMedia = +params['avaliacaoMedia'] || 0;
      this.resumoBanda = params['resumoBanda'] || '';

      if (this.router.url.includes('/pageband')) {
        this.bandaService.getBandaData(this.nomeBanda).subscribe(data => {
          if (data && data.content && data.content.length > 0) {
            this.albuns = data.content[0].albuns;
          } else {
          }
        });
      }
    });
  }
}
