import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllMusic(): Observable<any> {
    let url: string = '/musica/listar-musicas-completas/';
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any>(this.apiUrl + url, { headers });
  }

  registerMusic(music: { idAlbum:number; nomeMusica: string; resumoMusica: string; duracao:number }): Observable<HttpResponse<any>> {
    let url: string = '/musica/novo-registro/';
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(this.apiUrl + url, music, { headers, observe: 'response', responseType: 'text' as 'json' });
  }
}
