import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8080/subscriptions';

  constructor(private http: HttpClient) {}

  getSubscriptions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  createSubscription(subscriptionData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, subscriptionData);
  }

  // ✅ Méthode pour récupérer les souscriptions (si besoin)
  

  getSubscriptionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getSubscriptionsByCustomer(customerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  addSubscription(subscription: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, subscription);
  }

  cancelSubscription(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/cancel/${id}`, {});
  }

  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
