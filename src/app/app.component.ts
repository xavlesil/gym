import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    SidebarComponent
  ],
  template: `
    <!-- Layout Dashboard visible uniquement si l'utilisateur est connecté -->
    <mat-sidenav-container *ngIf="isLoggedIn()" class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <app-sidebar></app-sidebar>
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>

    <!-- Contenu simple sans layout lorsque l'utilisateur n'est pas connecté -->
    <router-outlet *ngIf="!isLoggedIn()"></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Méthode pour vérifier si l'utilisateur est connecté.
   * Ici, par exemple, on considère que l'utilisateur est connecté si un token est présent dans le localStorage.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
