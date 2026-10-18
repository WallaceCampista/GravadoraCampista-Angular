import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllMusic(): Observable<any> {
    let url: string = '/musica/listar-musicas-completas/';
    return this.http.get<any>(this.apiUrl + url);
  }

  // duracao null: a música ainda não tem duração (ela vem do MP3, quando for enviado)
  registerMusic(music: { idAlbum:number; nomeMusica: string; resumoMusica: string; duracao: number | null }): Observable<HttpResponse<any>> {
    let url: string = '/musica/novo-registro/';
    return this.http.post<any>(this.apiUrl + url, music, { observe: 'response', responseType: 'text' as 'json' });
  }

  updateMusic(id: number, music: { idAlbum: number; nomeMusica: string; resumoMusica: string; duracao: number | null }): Observable<string> {
    const url = `/musica/update/${id}/`;
    return this.http.put(this.apiUrl + url, music, { responseType: 'text' });
  }

  avaliarMusica(id: number, nota: number): Observable<string> {
    const url = `/musica/avaliar-musica/${id}/`;
    return this.http.post(this.apiUrl + url, {nota}, {responseType: 'text'});
  }

  // O MP3 vai no campo "arquivo" de um formulário multipart; a API lê a duração dele
  enviarAudio(id: number, arquivo: File): Observable<string> {
    const url = `/musica/audio/${id}/`;
    const formulario = new FormData();
    formulario.append('arquivo', arquivo);
    return this.http.post(this.apiUrl + url, formulario, { responseType: 'text' });
  }

  removerAudio(id: number): Observable<string> {
    const url = `/musica/audio/${id}/`;
    return this.http.delete(this.apiUrl + url, { responseType: 'text' });
  }

  // Nota que o usuário logado já deu (null se ainda não avaliou)
  minhaAvaliacaoMusica(id: number): Observable<{ nota: number | null }> {
    const url = `/musica/minha-avaliacao/${id}/`;
    return this.http.get<{ nota: number | null }>(this.apiUrl + url);
  }

  deleteMusic(id: number): Observable<any> {
    const url = `/musica/delete/${id}/`;
    return this.http.delete(this.apiUrl + url, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
