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
      const idBanda = Number(params['idBanda']);

      // Pelo ID: a busca por nome usa "contém" e podia abrir outra banda ("Queen" x "Queens of the Stone Age")
      this.bandaService.getAllBand().subscribe(bandas => {
        const banda = bandas.find((item: any) => item.idBanda === idBanda);
        if (!banda) {
          this.router.navigate(['/banda']);
          return;
        }
        this.nomeBanda = banda.nomeBanda;
        this.avaliacaoMedia = banda.avaliacaoMedia;
        this.resumoBanda = banda.resumoBanda;
        this.albuns = banda.albuns;
      });
    });
  }
}
