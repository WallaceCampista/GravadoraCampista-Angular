import { Component, OnInit } from '@angular/core';
import { BandaService } from 'src/app/service/servicos/formularios/banda.service';

@Component({
  selector: 'app-inicio-view',
  templateUrl: './inicio-view.component.html',
  styleUrls: ['./inicio-view.component.scss']
})
export class InicioViewComponent implements OnInit {
  top3Bands: any[] = [];

  constructor(private bandaService: BandaService) {}

  ngOnInit(): void {
    this.bandaService.getTop3Bands().subscribe({
      next: bands => {
        this.top3Bands = bands;
      },
      error: error => {
      }
    });
  }
}
