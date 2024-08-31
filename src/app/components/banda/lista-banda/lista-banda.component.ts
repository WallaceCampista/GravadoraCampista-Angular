import { Component, OnInit } from '@angular/core';
import { BandaService } from 'src/app/service/servicos/banda.service';
import { AdminService } from 'src/app/service/servicos/usuario/admin.service';

interface Banda {
  id: number;
  nome: string;
  resumo: string;
  avaliacao: number;
  albuns: number;
}

@Component({
  selector: 'app-lista-banda',
  templateUrl: './lista-banda.component.html',
  styleUrls: ['./lista-banda.component.scss']
})
export class ListaBandaComponent implements OnInit {
  bandas: Banda[] = [];
  isAscending = true;
  currentSortColumn = '';
  isAdmin: boolean = false;

  constructor(private bandaService: BandaService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.fetchAllBands();
  }

  fetchAllBands(): void {
    this.bandaService.getAllBand().subscribe(data => {
      console.log('Bandas:', data);
      this.bandas = data.map((item: any) => ({
        id: item.idBanda,
        nome: item.nomeBanda,
        resumo: item.resumoBanda,
        avaliacao: item.avaliacaoMedia,
        albuns: item.albuns.length
      }));
    });
  }

  sortColumn(column: keyof Banda) {
    if (this.currentSortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }

    this.bandas.sort((a, b) => {
      if (a[column] < b[column]) {
        return this.isAscending ? -1 : 1;
      } else if (a[column] > b[column]) {
        return this.isAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
}
