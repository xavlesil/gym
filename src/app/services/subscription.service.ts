// src/app/services/subscription.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `http://localhost:8080/subscriptions`;

  constructor(private http: HttpClient) { }

  getSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createSubscription(subscription: any): Observable<any> {
    return this.http.post(this.apiUrl, subscription);
  }

  cancelSubscription(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}