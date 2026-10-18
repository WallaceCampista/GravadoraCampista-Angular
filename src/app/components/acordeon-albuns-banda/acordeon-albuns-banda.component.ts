import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';
import { Faixa, PlayerService } from 'src/app/service/servicos/player/player.service';

@Component({
  selector: 'app-acordeon-albuns-banda',
  templateUrl: './acordeon-albuns-banda.component.html',
  styleUrls: ['./acordeon-albuns-banda.component.scss']
})
export class AcordeonAlbunsBandaComponent implements OnChanges {
  @Input() albuns: any[] = [];
  @Input() nomeBanda: string = '';
  musicasPorAlbum: { [albumId: number]: any[] } = {};
  albumAberto: number | null = null;

  constructor(private albumService: AlbumService, private player: PlayerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['albuns'] && this.albuns.length) {
      this.carregarMusicas();
    }
  }

  // Um álbum aberto por vez; clicar no que já está aberto fecha
  alternarAlbum(albumId: number) {
    this.albumAberto = this.albumAberto === albumId ? null : albumId;
  }

  // Só as faixas com MP3 entram na fila
  faixasDoAlbum(album: any): Faixa[] {
    return (this.musicasPorAlbum[album.albumId] ?? [])
      .filter(musica => musica.audioArquivo)
      .map(musica => ({
        id: musica.musicaId,
        nome: musica.nomeMusica,
        banda: this.nomeBanda,
        album: album.nomeAlbum,
        capaArquivo: album.capaArquivo,
        audioArquivo: musica.audioArquivo
      }));
  }

  tocarAlbum(album: any) {
    this.player.tocarFila(this.faixasDoAlbum(album));
  }

  // O ▶ de uma faixa toca o álbum a partir dela; na faixa atual, pausa ou continua
  tocarFaixa(album: any, musica: any) {
    if (this.ehAtual(musica)) {
      this.player.alternar();
      return;
    }
    const fila = this.faixasDoAlbum(album);
    this.player.tocarFila(fila, fila.findIndex(faixa => faixa.id === musica.musicaId));
  }

  ehAtual(musica: any): boolean {
    return this.player.faixaAtual?.id === musica.musicaId;
  }

  tocandoAgora(musica: any): boolean {
    return this.ehAtual(musica) && this.player.tocando;
  }

  // Pelo ID: a busca por nome usa "contém" e podia trazer as músicas de outro álbum
  private carregarMusicas() {
    const ids = new Set(this.albuns.map(album => album.albumId));
    this.albumService.getAllAlbum().subscribe(albuns => {
      this.musicasPorAlbum = {};
      albuns
        .filter((album: any) => ids.has(album.idAlbum))
        .forEach((album: any) => this.musicasPorAlbum[album.idAlbum] = album.musicas);
    });
  }
}
