import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';

@Component({
  selector: 'app-acordeon-albuns-banda',
  templateUrl: './acordeon-albuns-banda.component.html',
  styleUrls: ['./acordeon-albuns-banda.component.scss']
})
export class AcordeonAlbunsBandaComponent implements OnChanges {
  @Input() albuns: any[] = [];
  musicasPorAlbum: { [albumId: number]: any[] } = {};
  albumAberto: number | null = null;

  constructor(private albumService: AlbumService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['albuns'] && this.albuns.length) {
      this.carregarMusicas();
    }
  }

  // Um álbum aberto por vez; clicar no que já está aberto fecha
  alternarAlbum(albumId: number) {
    this.albumAberto = this.albumAberto === albumId ? null : albumId;
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
