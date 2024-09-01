import { Component, OnInit, Input } from '@angular/core';
import { BandaService } from 'src/app/service/servicos/banda.service';
import { AdminService } from 'src/app/service/servicos/usuario/admin.service';
import { Router } from '@angular/router';

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
  @Input() isAdmin: boolean = false;
  bandas: Banda[] = [];
  currentSortColumn: string = '';
  isAscending: boolean = true;


  constructor(private bandaService: BandaService, private adminService: AdminService, private router: Router) {}

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

  deleteBand(id: number): void {
    this.bandaService.deleteBand(id).subscribe({
      next: () => {
        this.bandas = this.bandas.filter(banda => banda.id !== id);
        console.log('Banda deletada com sucesso!');
      },
      error: error => {
        console.error('Erro ao deletar banda:', error);
      }
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

  navigateToPageBanda(banda: any): void {
    this.router.navigate(['/pagebanda'], {
      queryParams: {
        nomeBanda: banda.nome,
        avaliacaoMedia: banda.avaliacao,
        resumoBanda: banda.resumo
      }
    });
  }

}
