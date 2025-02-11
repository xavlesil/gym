import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';




@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule,MatInputModule,MatButtonModule,MatCardModule,ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        () => {
          this.router.navigate(['/dashboard']); // Redirige vers le tableau de bord après la connexion
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur de connexion', error);
          alert('Nom d\'utilisateur ou mot de passe incorrect.'); // Affiche une alerte en cas d'erreur
        }
      );
    }
  }
  goToForgotPassword(): void {
    this.router.navigate(['/change-password']);
  }

  // Méthode pour rediriger vers la page "Inscription"
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}