import { Component, OnInit, Input } from '@angular/core';
import { MusicaService } from 'src/app/service/servicos/musica.service';
import { AdminService } from 'src/app/service/servicos/usuario/admin.service';

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
export class ListarMusicaComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  musicas: Musica[] = [];
  currentSortColumn: string = '';
  isAscending: boolean = true;

  constructor(private musicaService: MusicaService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.fetchAllMusic();
  }

  fetchAllMusic(): void {
    this.musicaService.getAllMusic().subscribe(data => {
      console.log('Músicas:', data);
      this.musicas = data.map((item: any) => ({
        id: item.idMusica,
        nome: item.nomeMusica,
        resumo: item.resumoMusica,
        avaliacao: item.avaliacaoMedia,
        duracao: item.duracao,
        album: item.albumID.nomeAlbum,
        banda: item.bandaID.nomeBanda
      }));
    });
  }

  deleteMusic(id: number): void {
    this.musicaService.deleteMusic(id).subscribe({
      next: () => {
        this.musicas = this.musicas.filter(musica => musica.id !== id);
        console.log('Música deletada com sucesso!');
      },
      error: error => {
        console.error('Erro ao deletar música:', error);
      }
    });
  }

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
