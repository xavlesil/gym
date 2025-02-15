import { Component, Inject, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-subscription',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ListSubscriptionComponent implements OnInit {
  subscriptions: any[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    @Inject(SubscriptionService) private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.loading = true;
    this.errorMessage = null;
    
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => {
        this.subscriptions = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des abonnements';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancelSubscription(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir résilier cet abonnement ?')) {
      this.subscriptionService.cancelSubscription(id).subscribe({
        next: () => {
          this.loadSubscriptions();
        },
        error: (err) => {
          alert('Erreur lors de la résiliation');
          console.error(err);
        }
      });
    }
  }

  navigateToAddSubscription(): void {
    this.router.navigate(['/dashboard/subscriptions/add']);
  }
}