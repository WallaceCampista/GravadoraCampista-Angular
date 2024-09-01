import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllAlbum(): Observable<any> {
    let url: string = '/album/listar-albuns-completos/';
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any>(this.apiUrl + url, { headers });
  }

  registerAlbum(album: { idBanda:number; nomeAlbum: string; resumoAlbum: string }): Observable<HttpResponse<any>> {
    let url: string = '/album/novo-registro/';
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(this.apiUrl + url, album, { headers, observe: 'response', responseType: 'text' as 'json' });
  }

  getAlbumData(albumName: string): Observable<any> {
    const url = `/album/${albumName}/`;
    const headers = this.authService.getAuthHeaders();
    return this.http.get(this.apiUrl + url, { headers });
  }

  deleteAlbum(id: number): Observable<any> {
    const url = `/album/delete/${id}/`;
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
