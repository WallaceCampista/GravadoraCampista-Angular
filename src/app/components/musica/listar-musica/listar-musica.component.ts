import { Component } from '@angular/core';

interface Musica {
  id: number;
  nome: string;
  resumo: string;
  avaliacao: number;
  duracao: number;
  album: string;
  banda: string;
}

@Component({
  selector: 'app-listar-musica',
  templateUrl: './listar-musica.component.html',
  styleUrls: ['./listar-musica.component.scss']
})
export class ListarMusicaComponent {
  musicas: Musica[] = [
    { id: 2, nome: 'Dona do meu pensamento', resumo: 'Musica para sua amada', avaliacao: 8, duracao: 450, album: 'Camisa 10 Joga Bola Até na Chuva', banda: 'Charlie Brown Jr.' },
    { id: 3, nome: 'Só os loucos sabem', resumo: 'Loucura total', avaliacao: 9, duracao: 350, album: 'Camisa 10 Joga Bola Até na Chuva', banda: 'Charlie Brown Jr.' },
    { id: 4, nome: 'Só existe o agora', resumo: 'Viva intensamente', avaliacao: 9.7, duracao: 487, album: 'Camisa 10 Joga Bola Até na Chuva', banda: 'Charlie Brown Jr.' },
    { id: 5, nome: 'Puro sangue', resumo: 'Qualquer', avaliacao: 6, duracao: 247, album: 'Camisa 10 Joga Bola Até na Chuva', banda: 'Charlie Brown Jr.' },
    { id: 6, nome: 'Hóstia', resumo: 'Musica doida', avaliacao: 9, duracao: 354, album: '7 Vezes', banda: 'O Rappa' },
    { id: 7, nome: 'Meu mundo é o barro', resumo: 'João de barro', avaliacao: 10, duracao: 365, album: '7 Vezes', banda: 'O Rappa' },
  ];

  currentSortColumn: string = '';
  isAscending: boolean = true;

  sortColumn(column: keyof Musica) {
    if (this.currentSortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }

    this.musicas.sort((a, b) => {
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
