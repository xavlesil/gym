import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/Subsription'; // Mets l'URL de ton backend

  constructor(private http: HttpClient) {}

  // Récupérer les statistiques
  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }
}
