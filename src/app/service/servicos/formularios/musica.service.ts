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

  registerMusic(music: { idAlbum:number; nomeMusica: string; resumoMusica: string; duracao:number }): Observable<HttpResponse<any>> {
    let url: string = '/musica/novo-registro/';
    return this.http.post<any>(this.apiUrl + url, music, { observe: 'response', responseType: 'text' as 'json' });
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
