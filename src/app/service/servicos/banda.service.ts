import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/service/servicos/usuario/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BandaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllBand(): Observable<any> {
    let url: string = '/banda/listar-bandas-completos/';
    const headers = this.authService.getAuthHeaders();
    return this.http.get<any>(this.apiUrl + url, { headers });
  }

  registerBand(band: { nomeBanda: string; resumoBanda: string }): Observable<HttpResponse<any>> {
    let url: string = '/banda/novo-registro/';
    const headers = this.authService.getAuthHeaders();
    return this.http.post<any>(this.apiUrl + url, band, { headers, observe: 'response', responseType: 'text' as 'json' });
  }
}
