import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/servicos/usuario/admin.service';

interface Album {
  id: number;
  nome: string;
  resumo: string;
  duracao: number;
  avaliacao: number;
  banda: string;
  musicas: number;
}

@Component({
  selector: 'app-lista-album',
  templateUrl: './lista-album.component.html',
  styleUrls: ['./lista-album.component.scss']
})
export class ListaAlbumComponent implements OnInit {
  albums: Album[] = [
    {
      id: 1,
      nome: 'Imunidade Musical',
      resumo: 'Imunidade Musical é o sétimo álbum de estúdio da banda brasileira Charlie Brown Jr., lançado em 2005. O álbum inaugura uma nova formação: Pinguim na bateria, Heitor Gomes no baixo, e Thiago Castanho, guitarrista da formação original, que retorna à banda',
      duracao: 685,
      avaliacao: 9.8,
      banda: 'Charlie Brown Jr.',
      musicas: 21
    },
    {
      id: 2,
      nome: '7 Vezes',
      resumo: 'Traduzido do inglês-7 Vezes é o sétimo álbum da banda brasileira O Rappa. O título alude ao fato de este ser o sétimo álbum lançado por O Rappa. Foi produzido por Ricardo Vidal, Tom Sabóia e O Rappa. O álbum foi lançado em 2008 pela Warner Music.',
      duracao: 648,
      avaliacao: 9.3,
      banda: 'O Rappa',
      musicas: 14
    },
    {
      id: 3,
      nome: 'Nunca Tem Fim...',
      resumo: 'Nunca Tem Fim... é o sexto e último álbum de estúdio do grupo O Rappa. Foi lançado em 15 de agosto de 2013 pelo selo Warner Music Brasil e gravado em LP duplo pela Polysom, depois de cinco anos sem gravar mais um álbum de estúdio.',
      duracao: 1472,
      avaliacao: 10,
      banda: 'O Rappa',
      musicas: 10
    }
  ];

  isAscending = true;
  currentSortColumn = '';
  isAdmin: boolean = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  sortColumn(column: keyof Album) {
    if (this.currentSortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }

    this.albums.sort((a, b) => {
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
