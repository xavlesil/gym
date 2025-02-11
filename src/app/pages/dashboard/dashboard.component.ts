import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card'; // Pour les cartes Angular Material
import { DashboardService } from '../../services/dashboard.service';
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, HttpClientModule, MatCardModule, CommonModule,
    MatSidenavModule, RouterModule, SidebarComponent] //
 //
    //  Ajout des imports nécessaires
})

export class DashboardComponent implements OnInit {
  totalClients: number = 0;
  totalSubscriptions: number = 0;
  revenue: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStatistics().subscribe(data => {
      this.totalClients = data.totalClients;
      this.totalSubscriptions = data.totalSubscriptions;
      this.revenue = data.revenue;
    });
  }
}
