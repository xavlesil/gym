import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StatsService } from '../../services/stats.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Attention à bien mettre "styleUrls" (pluriel)
})
export class HomeComponent implements OnInit {
  activeCustomers: number = 0;
  monthlyRevenue: number = 0;

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    // Appel du service pour récupérer le nombre de clients actifs
    this.statsService.getActiveCustomers().subscribe(
      (data) => {
        this.activeCustomers = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients actifs', error);
      }
    );

    // Appel du service pour récupérer le chiffre d'affaires mensuel
    this.statsService.getMonthlyRevenue().subscribe(
      (data) => {
        this.monthlyRevenue = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération du chiffre d\'affaires mensuel', error);
      }
    );
  }
}
