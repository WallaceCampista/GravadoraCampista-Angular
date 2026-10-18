import { Component, OnInit, Input } from '@angular/core';
import { MusicaService } from 'src/app/service/servicos/formularios/musica.service';
import { AdminService } from 'src/app/service/servicos/usuario/admin.service';
import { Faixa, PlayerService } from 'src/app/service/servicos/player/player.service';

interface Musica {
  id: number;
  nome: string;
  resumo: string;
  avaliacao: number;
  duracao: number;
  album: string;
  banda: string;
  idAlbum: number;
  audio: string; // "" = sem áudio
  capa: string; // "" = sem capa
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

  constructor(private musicaService: MusicaService, private adminService: AdminService, private player: PlayerService) {}

  ngOnInit(): void {
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.fetchAllMusic();
  }

  fetchAllMusic(): void {
    this.musicaService.getAllMusic().subscribe(data => {
      this.musicas = data.map((item: any) => ({
        id: item.idMusica,
        nome: item.nomeMusica,
        resumo: item.resumoMusica,
        avaliacao: item.avaliacaoMedia,
        duracao: item.duracao,
        album: item.albumID.nomeAlbum,
        banda: item.bandaID.nomeBanda,
        idAlbum: item.albumID.albumId,
        audio: item.audioArquivo ?? '',
        capa: item.albumID.capaArquivo ?? ''
      }));
    });
  }

  ehAtual(musica: Musica): boolean {
    return this.player.faixaAtual?.id === musica.id;
  }

  tocandoAgora(musica: Musica): boolean {
    return this.ehAtual(musica) && this.player.tocando;
  }

  // Toca a partir desta música, seguindo a ordem da tabela (só as que têm MP3)
  tocar(musica: Musica) {
    if (this.ehAtual(musica)) {
      this.player.alternar();
      return;
    }
    const fila: Faixa[] = this.musicas
      .filter(item => item.audio)
      .map(item => ({ id: item.id, nome: item.nome, banda: item.banda, album: item.album, capaArquivo: item.capa || null, audioArquivo: item.audio }));
    this.player.tocarFila(fila, fila.findIndex(faixa => faixa.id === musica.id));
  }

  deleteMusic(id: number): void {
    this.musicaService.deleteMusic(id).subscribe({
      next: () => {
        this.musicas = this.musicas.filter(musica => musica.id !== id);
      },
      error: error => {
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
