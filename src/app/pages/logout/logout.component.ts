// src/app/pages/logout/logout.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '', // Pas besoin de template, on redirige directement
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout(); // Déconnecte l'utilisateur
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}