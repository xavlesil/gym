import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; 
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from "./components/sidebar/sidebar.component";  
import { RouterModule } from '@angular/router';   

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatSidenavModule, 
    MatListModule, 
    SidebarComponent // Assure que SidebarComponent est bien importé
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <app-sidebar></app-sidebar> <!-- Barre latérale -->
      </mat-sidenav>
      <mat-sidenav-content>
        <router-outlet></router-outlet> <!-- Contenu principal -->
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.css'] // Vérifie que ce fichier existe bien
})
export class AppComponent { }
