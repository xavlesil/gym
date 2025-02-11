// src/app/services/offer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = `http://localhost:8080/packs`;

  constructor(private http: HttpClient) { }

  getOffers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOffer(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addOffer(offer: any): Observable<any> {
    return this.http.post(this.apiUrl, offer);
  }

  updateOffer(id: number, offer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, offer);
  }

  deleteOffer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}