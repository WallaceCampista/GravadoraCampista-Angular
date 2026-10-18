import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllAlbum(): Observable<any> {
    let url: string = '/album/listar-albuns-completos/';
    return this.http.get<any>(this.apiUrl + url);
  }

  registerAlbum(album: { idBanda:number; nomeAlbum: string; resumoAlbum: string }): Observable<HttpResponse<any>> {
    let url: string = '/album/novo-registro/';
    return this.http.post<any>(this.apiUrl + url, album, { observe: 'response', responseType: 'text' as 'json' });
  }

  getAlbumData(albumName: string): Observable<any> {
    const url = `/album/${albumName}/`;
    return this.http.get(this.apiUrl + url);
  }

  updateAlbum(id: number, album: { idBanda: number; nomeAlbum: string; resumoAlbum: string }): Observable<string> {
    const url = `/album/update/${id}/`;
    return this.http.put(this.apiUrl + url, album, { responseType: 'text' });
  }

  avaliarAlbum(id: number, nota: number): Observable<string> {
    const url = `/album/avaliar-album/${id}/`;
    return this.http.post(this.apiUrl + url, {nota}, {responseType: 'text'});
  }

  deleteAlbum(id: number): Observable<any> {
    const url = `/album/delete/${id}/`;
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
