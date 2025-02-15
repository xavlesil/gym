import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private baseUrl = 'http://localhost:8080'; // Remplace par l'URL de ton backend

  constructor(private http: HttpClient) {}

  /**
   * Récupère le nombre de clients actifs depuis le backend.
   * L'endpoint utilisé est: GET http://localhost:8080/customers/stats
   */
  getActiveCustomers(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/customers/stats`);
  }

  /**
   * Récupère le chiffre d'affaires mensuel depuis le backend.
   
   */
  getMonthlyRevenue(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/subscriptions/stats`);
  }
}
