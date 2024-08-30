import { Component } from '@angular/core';

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
export class ListaBandaComponent {
  bandas: Banda[] = [
    {
      id: 1,
      nome: 'Charlie Brown Jr.',
      resumo: 'Charlie Brown Jr. foi uma banda brasileira de rock formada em Santos em 1992.',
      avaliacao: 9.8,
      albuns: 10
    },
    {
      id: 2,
      nome: 'O Rappa',
      resumo: 'O Rappa foi uma banda de rock brasileira, formada em 1993 no Rio de Janeiro.',
      avaliacao: 9.3,
      albuns: 7
    }
  ];

  isAscending = true;
  currentSortColumn: keyof Banda = 'id'; // Inicializar com um valor válido

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
