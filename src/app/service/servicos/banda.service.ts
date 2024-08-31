import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}
