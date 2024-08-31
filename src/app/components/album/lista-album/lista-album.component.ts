import { Component, OnInit } from '@angular/core';
import { AlbumService } from 'src/app/service/servicos/album.service';
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
  albums: Album[] = [];
  isAscending = true;
  currentSortColumn = '';
  isAdmin: boolean = false;

  constructor(private albumService: AlbumService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.fetchAllAlbums();
  }

  fetchAllAlbums(): void {
    this.albumService.getAllAlbum().subscribe(data => {
      console.log('Álbuns:', data);
      this.albums = data.map((item: any) => ({
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
