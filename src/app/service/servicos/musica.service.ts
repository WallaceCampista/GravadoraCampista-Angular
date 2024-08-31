import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
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

  deleteMusic(id: number): Observable<any> {
    const url = `/musica/delete/${id}/`;
    const headers = this.authService.getAuthHeaders();
    return this.http.delete(this.apiUrl + url, { headers, responseType: 'text' }).pipe(
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
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
