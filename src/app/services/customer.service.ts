// src/app/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = `http://localhost:8080/customers`;

  constructor(private http: HttpClient) { }

  // Récupère tous les clients
  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupère un client par son ID
  getCustomer(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Ajoute un nouveau client
  addCustomer(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  // Met à jour un client existant
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, customer);
  }

  // Supprime un client
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Recherche des clients
  searchCustomers(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?name=${query}`);
  }
}
