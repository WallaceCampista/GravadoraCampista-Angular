import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from 'src/app/service/servicos/formularios/album.service';
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
  @Input() isAdmin: boolean = false;
  albuns: Album[] = [];
  currentSortColumn: string = '';
  isAscending: boolean = true;

  constructor(private albumService: AlbumService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.fetchAllAlbums();
  }

  fetchAllAlbums(): void {
    this.albumService.getAllAlbum().subscribe(data => {
      this.albuns = data.map((item: any) => ({
        id: item.idAlbum,
        nome: item.nomeAlbum,
        resumo: item.resumoAlbum,
        duracao: item.duracaoTotal,
        avaliacao: item.avaliacaoMedia,
        banda: item.banda.nomeBanda,
        musicas: item.musicas.length
      }));
    });
  }

  deleteAlbum(id: number): void {
    this.albumService.deleteAlbum(id).subscribe({
      next: () => {
        this.albuns = this.albuns.filter(album => album.id !== id);
      },
      error: error => {
      }
    });
  }

  sortColumn(column: keyof Album) {
    if (this.currentSortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }

    this.albuns.sort((a, b) => {
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
