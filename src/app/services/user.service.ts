import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Interface pour le modèle User
export interface User {
  id?: number;
  username: string;
  password: string;
  roles?: string; // Optionnel pour éviter les erreurs si non fourni
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users'; // 🔥 Assure-toi que c'est la bonne URL

  // Headers pour les requêtes HTTP
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // ✅ Récupérer la liste des utilisateurs
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap((users) => console.log('Utilisateurs récupérés:', users)),
      catchError(this.handleError)
    );
  }

  // ✅ Créer un utilisateur
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, this.httpOptions).pipe(
      tap((newUser) => console.log('Utilisateur créé:', newUser)),
      catchError(this.handleError)
    );
  }

  // ✅ Mettre à jour un utilisateur
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, this.httpOptions).pipe(
      tap((updatedUser) => console.log(`Utilisateur mis à jour ID=${id}:`, updatedUser)),
      catchError(this.handleError)
    );
  }

  // ✅ Supprimer un utilisateur
  deleteUser(id: number): Observable<{}> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.httpOptions).pipe(
      tap(() => console.log(`Utilisateur supprimé ID=${id}`)),
      catchError(this.handleError)
    );
  }

  // ✅ Gestion des erreurs
  private handleError(error: any) {
    console.error('Erreur API:', error);
    return throwError(() => new Error('Problème de connexion au serveur.'));
  }
}
