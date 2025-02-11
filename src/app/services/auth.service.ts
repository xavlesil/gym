// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1'; // Remplace par l'URL de ton API

  constructor(private http: HttpClient, private router: Router) {}

  // Méthode pour l'inscription
  register(user: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Méthode pour la connexion
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Stocker le token JWT dans le localStorage
        localStorage.setItem('access_token', response.token);
      })
    );
  }

  // Méthode pour changer le mot de passe
  changePassword(data: { username: string, oldPassword: string, newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, data);
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Méthode pour se déconnecter
  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  // Méthode pour récupérer le token JWT
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}