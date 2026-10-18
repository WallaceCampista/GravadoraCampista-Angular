import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BandaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerBand(band: { nomeBanda: string; resumoBanda: string }): Observable<HttpResponse<any>> {
    let url: string = '/banda/novo-registro/';
    return this.http.post<any>(this.apiUrl + url, band, { observe: 'response', responseType: 'text' as 'json' });
  }

  getAllBand(): Observable<any> {
    let url: string = '/banda/listar-bandas-completos/';
    return this.http.get<any>(this.apiUrl + url);
  }

  getTop3Bands(): Observable<any[]> {
    return this.getAllBand().pipe(
      map(bands => bands.sort((a: any, b: any) => b.avaliacaoMedia - a.avaliacaoMedia).slice(0, 3))
    );
  }

  avaliarBanda(id: number, nota: number): Observable<any> {
    const url = `/banda/avaliar-banda/${id}/`;
    return this.http.post(this.apiUrl + url, {nota}, {responseType: 'text'});
  }

  updateBand(id: number, band: { nomeBanda: string; resumoBanda: string }): Observable<string> {
    const url = `/banda/update/${id}/`;
    return this.http.put(this.apiUrl + url, band, { responseType: 'text' });
  }

  getBandaData(nomeBanda: string): Observable<any> {
    const url = `/banda/${nomeBanda}/`;
    return this.http.get(this.apiUrl + url);
  }


  deleteBand(id: number): Observable<any> {
    const url = `/banda/delete/${id}/`;
    return this.http.delete(this.apiUrl + url, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  // A imagem vai no campo "arquivo" de um formulário multipart (o navegador define o Content-Type)
  enviarFoto(id: number, arquivo: File): Observable<string> {
    const url = `/banda/foto/${id}/`;
    const formulario = new FormData();
    formulario.append('arquivo', arquivo);
    return this.http.post(this.apiUrl + url, formulario, { responseType: 'text' });
  }

  removerFoto(id: number): Observable<string> {
    const url = `/banda/foto/${id}/`;
    return this.http.delete(this.apiUrl + url, { responseType: 'text' });
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
